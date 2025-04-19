import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import ignore from 'ignore';

// Mapping file extensions to syntax highlighting languages
export const defaultExtensionToLang: Record<string, string> = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.json': 'json',
    '.html': 'html',
    '.css': 'css',
    '.scss': 'scss',
};

/**
 * Reads and parses tsconfig.json from the given root directory
 * and returns the list of file names determined by the configuration.
 */
export function getSourceFilesFromTsConfig(
    tsConfigPath: string,
    isAllowed: ReturnType<typeof getIsAllowed>
): string[] {
    const rootDir = path.dirname(tsConfigPath);
    if (!fs.existsSync(tsConfigPath)) {
        console.error(`tsconfig.json not found: ${tsConfigPath}`);
        process.exit(1);
    }

    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    if (configFile.error) {
        console.error('Error reading tsconfig.json:', configFile.error);
        process.exit(1);
    }

    const parsed = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        rootDir
    );
    if (parsed.errors && parsed.errors.length > 0) {
        console.error('Error parsing tsconfig.json:', parsed.errors);
        process.exit(1);
    }

    const allFiles = [...parsed.fileNames];

    if (parsed.projectReferences) {
        for (const ref of parsed.projectReferences) {
            const refConfigDir = path.resolve(rootDir, ref.path);
            allFiles.push(
                ...getSourceFilesFromTsConfig(refConfigDir, isAllowed)
            );
        }
    }

    return allFiles.filter(file => isAllowed(file, false));
}

interface GetIsAllowed {
    allowedExtensions: string[];
    ignorePatterns: string[];
    rootDir: string;
    renderedImports: Set<string>;
}
function getIsAllowed({allowedExtensions, ignorePatterns, rootDir, renderedImports }: GetIsAllowed) {
    const allowedExtensionsSet = new Set(allowedExtensions);
    const ig = ignore().add(ignorePatterns)
    return (filePath: string, isDirectory: boolean) => {
        if (renderedImports.has(filePath)) {
            return false;
        }
        if (!isDirectory && !allowedExtensionsSet.has(path.extname(filePath).toLowerCase())) {
            return false;
        }
        return !ig.ignores(path.relative(rootDir, filePath));
    }
}

/**
 * Traverses the AST of a source file and finds all import declarations and require calls,
 * where the imported module's extension is included in allowedExtensions.
 */
function findModuleImportsInAst(filePath: string): string[] {
    const content = fs.readFileSync(filePath, 'utf8');
    const foundImports: string[] = [];

    let sourceFile: ts.SourceFile;
    try {
        sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
    } catch (error) {
        console.error(`Error creating source file for ${filePath}:`, error);
        return foundImports;
    }

    function visit(node: ts.Node) {
        // Handle import declarations: import ... from 'module'
        if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const moduleName = node.moduleSpecifier.text;
            foundImports.push(moduleName);
        }
        // Handle require calls: const x = require('module')
        if (
            ts.isCallExpression(node) &&
            node.expression.getText(sourceFile) === 'require' &&
            node.arguments.length === 1 &&
            ts.isStringLiteral(node.arguments[0])
        ) {
            const moduleName = node.arguments[0].text;
            foundImports.push(moduleName);
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    return foundImports;
}

/**
 * Resolves an import path using the "paths" alias from tsconfig.
 * Example:
 *   alias: "~/*" → target: "./src/*"
 *   If imp is "~/components/atoms/Label.module.scss", it returns an absolute path
 *   like "<rootDir>/src/components/atoms/Label.module.scss".
 */
function resolveAliasImport(
    imp: string,
    tsConfigPaths: Record<string, string[]>,
    rootDir: string
): string | null {
    for (const aliasPattern in tsConfigPaths) {
        const targets = tsConfigPaths[aliasPattern]; // Array of paths, e.g., ['./src/*']
        if (aliasPattern.endsWith('/*')) {
            // Get alias prefix without "/*"
            const prefix = aliasPattern.slice(0, -1);
            if (imp.startsWith(prefix)) {
                const remainder = imp.slice(prefix.length);
                const target = targets[0]; // Use the first target
                if (target.endsWith('/*')) {
                    const targetPrefix = target.slice(0, -1);
                    return path.resolve(rootDir, targetPrefix + remainder);
                } else {
                    return path.resolve(rootDir, target);
                }
            }
        } else {
            // If alias is without wildcard
            if (imp === aliasPattern) {
                return path.resolve(rootDir, targets[0]);
            }
        }
    }
    return null;
}

export const ignoredPatterns = ['.git/**', 'node_modules/**', 'package-lock.json', 'yarn.lock', 'dist/**', 'tests/**', 'scripts/**', 'build/**', '**/*.test.ts'];

export const defaultPrompt = {
    intro: `I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.`,
    commonStyle: `All code and comments must be in English. Please follow the style and conventions used in the existing codebase.`,
    libs: `For react project use version 18 and 19 versions (with jsx-runtime style).`,
    practices: `Also use Clean Code, Clean Architecture, SOLID, Atomic design`,
    end: `If something is unclear or needs clarification, feel free to ask me.`
};

interface GetCodeMDOptions {
    ignorePatterns?: string[];
    extensionToLang?: Record<string, string>;
    prompts?: typeof defaultPrompt;
}

/**
 * Generates a Markdown file listing:
 * 1. The tsconfig.json content,
 * 2. The package.json content,
 * 3. All source files (from tsconfig.json) that have allowed extensions,
 *    excluding those that match ignore patterns.
 * Additionally, for each source file that can be parsed via AST,
 * it analyzes the list of import/require calls and attempts to resolve
 * the absolute path of the imported module using aliases from tsconfig.
 * If found, the file content is inserted into the Markdown as a code block.
 */
export function getCodeMD(
    rootDir: string,
    {
        ignorePatterns = ignoredPatterns,
        extensionToLang = defaultExtensionToLang,
        prompts = defaultPrompt,
    }: GetCodeMDOptions = {}
): string {
    const allowedExtensions = Object.keys(extensionToLang);
    const astParsableExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

    const gitignorePath = path.join(rootDir, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        console.log("Codools Note! .gitignore was found. I will use it.");
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        ignorePatterns.push(
            ...gitignoreContent
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'))
        );
    } else {
        console.log("Codools Warning! .gitignore wasn't found.");
    }

    // Begin building the Markdown content
    const mdContent: string[] = [...Object.values(prompts)];
    const renderedImports = new Set<string>();

    const packageJsonPath = path.join(rootDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        renderedImports.add(packageJsonPath);
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const projectName = JSON.parse(packageJsonContent).name;
        mdContent.push(`# Project "${projectName}"`, "");

        // Append package.json content
        mdContent.push('## package.json', '');
        mdContent.push('```json');
        mdContent.push(packageJsonContent);
        mdContent.push('```', '');
    } else {
        console.log("Codools Warning! package.json not found");
    }


    // Read tsconfig and package.json
    const tsConfigPath = allowedExtensions.some((ext)=> astParsableExtensions.has(ext)) ? path.join(rootDir, 'tsconfig.json') : null;
    const isTsConfigExists = tsConfigPath ? fs.existsSync(tsConfigPath) : false;
    if (tsConfigPath && !isTsConfigExists) {
        console.log("Codools Warning! tsconfig.json not found.");
    }



    if (isTsConfigExists && tsConfigPath) {
        renderedImports.add(tsConfigPath);

        const isAllowed = getIsAllowed({
            allowedExtensions,
            ignorePatterns,
            rootDir,
            renderedImports,
        });

        const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');
        // Parse tsconfig to get alias paths
        const tsConfigJson = JSON.parse(tsConfigContent);
        const tsConfigPaths: Record<string, string[]> =
            (tsConfigJson.compilerOptions && tsConfigJson.compilerOptions.paths) || {};

        const files: string[] = getSourceFilesFromTsConfig(path.join(rootDir, 'tsconfig.json'), isAllowed)
            .sort((a, b) => a.localeCompare(b));

        // Append tsconfig.json content
        mdContent.push('## tsconfig.json', '');
        mdContent.push('```json');
        mdContent.push(tsConfigContent);
        mdContent.push('```', '');

        // Append each source file's content along with its detected imports and imported file content
        files.forEach((filePath) => {
            const relativePath = path.relative(rootDir, filePath);
            const fileName = relativePath.replace(/\\/g, '/');
            mdContent.push(`## ${fileName}`, '');

            // Read file content
            let fileContent: string;
            try {
                fileContent = fs.readFileSync(filePath, 'utf8');
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
                fileContent = '';
            }
            const language = getLanguageForFile(filePath, extensionToLang);

            // Append file content with syntax highlighting
            mdContent.push(`\`\`\`${language}`, fileContent, '```', '');

            // If the file's extension is AST-parsable, analyze its import statements
            const ext = path.extname(filePath).toLowerCase();
            if (astParsableExtensions.has(ext)) {
                const detectedImports = findModuleImportsInAst(filePath);

                    detectedImports.forEach((imp) => {
                        let importedFileAbsolutePath: string | null;
                        if (imp.startsWith('.') || imp.startsWith('/')) {
                            importedFileAbsolutePath = path.resolve(path.dirname(filePath), imp);
                        } else {
                            // Resolve alias using tsconfig paths
                            importedFileAbsolutePath = resolveAliasImport(imp, tsConfigPaths, rootDir);
                        }
                        if (!importedFileAbsolutePath || !isAllowed(importedFileAbsolutePath, false)) {
                            return;
                        }
                        if (fs.existsSync(importedFileAbsolutePath)) {
                            renderedImports.add(importedFileAbsolutePath);
                            let importedContent: string;
                            try {
                                importedContent = fs.readFileSync(importedFileAbsolutePath, 'utf8');
                            } catch (error) {
                                console.error(`Error reading imported file ${importedFileAbsolutePath}:`, error);
                                importedContent = '';
                            }
                            const importedLanguage = getLanguageForFile(importedFileAbsolutePath, extensionToLang);
                            const innerFileName = path.relative(rootDir, importedFileAbsolutePath).replace(/\\/g, '/');
                            mdContent.push(`## ${innerFileName}`, '');
                            mdContent.push(`\`\`\`${importedLanguage}`, importedContent, '```', '');
                        } else {
                            mdContent.push(`#### ${imp} (file not found)`, '');
                        }
                    });
                    mdContent.push('');

            }
        });
    }

    mdContent.push(...getNoTsFilesMD({
        rootDir,
        extensionToLang,
        isAllowed: getIsAllowed({
            allowedExtensions: isTsConfigExists ? allowedExtensions.filter((ext) => !astParsableExtensions.has(ext)) : allowedExtensions,
            ignorePatterns,
            rootDir,
            renderedImports
        }),
    }));

    return mdContent.join('\n');
}

function getLanguageForFile(filePath: string, extensionToLang: Record<string, string>): string {
    const ext = path.extname(filePath).toLowerCase();
    return extensionToLang[ext] || '';
}


interface GetNoTsFilesMDProps {
    rootDir: string;
    isAllowed: ReturnType<typeof getIsAllowed>;
    extensionToLang: Record<string, string>;
}
function getNoTsFilesMD({ rootDir, isAllowed, extensionToLang}: GetNoTsFilesMDProps) {
    const noTSFiles = getAllFiles(rootDir, isAllowed);
    noTSFiles.sort((a, b) => a.localeCompare(b));
    const mdContent: string[] = [];
    noTSFiles.forEach((noTSFile) => {
        let content: string;
        try {
            content = fs.readFileSync(noTSFile, 'utf8');
        } catch (error) {
            console.error(`Error reading imported file ${noTSFile}:`, error);
            content = '';
        }
        const importedLanguage = getLanguageForFile(noTSFile, extensionToLang);
        const innerFileName = path.relative(rootDir, noTSFile).replace(/\\/g, '/');
        mdContent.push(`## ${innerFileName}`, '');
        mdContent.push(`\`\`\`${importedLanguage}`, content, '```', '');
    })
    return mdContent;
}

/**
 * Recursively collects all files under a directory.
 */
function getAllFiles(dir: string, isAllowed: ReturnType<typeof getIsAllowed>): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results: string[] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const isDirectory = entry.isDirectory();
        if(isAllowed(fullPath, isDirectory)) {
            if (isDirectory) {
                results.push(...getAllFiles(fullPath, isAllowed));
            } else {
                results.push(fullPath);
            }
        }
    }
    return results;
}
