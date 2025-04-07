import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { minimatch } from 'minimatch';

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
 * Reads and parses tsconfig.json from the given root directory,
 * and returns the list of file names determined by the configuration.
 */
function getSourceFilesFromTsConfig(rootDir: string): string[] {
    const tsConfigPath = path.join(rootDir, 'tsconfig.json');
    if (!fs.existsSync(tsConfigPath)) {
        console.error(`tsconfig.json not found in root directory: ${rootDir}`);
        process.exit(1);
    }

    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    if (configFile.error) {
        console.error('Error reading tsconfig.json:', configFile.error);
        process.exit(1);
    }

    const parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        rootDir
    );

    if (parsedConfig.errors && parsedConfig.errors.length > 0) {
        console.error('Error parsing tsconfig.json:', parsedConfig.errors);
        process.exit(1);
    }

    return parsedConfig.fileNames;
}

/**
 * Checks if a file matches any of the ignore patterns.
 */
function isIgnored(filePath: string, ignorePatterns: string[], rootDir: string): boolean {
    const relativePath = path.relative(rootDir, filePath);
    return ignorePatterns.some(pattern => minimatch(relativePath, pattern));
}



export const ignoredPatterns = ['node_modules/**', 'dist/**', 'tests/**', 'scripts/**', 'build/**', '**/*.test.ts'];

export const defaultPrompt = {
    intro: `I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.`,
    commonStyle: `All code and comments must be in English. Please follow the style and conventions used in the existing codebase.`,
    libs: `For react project use version 18 and 19 versions (with jsx-runtime style).`,
    practices: `Also use Clean Architecture, SOLID, atomic design`,
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
 */
export function getCodeMD(
    rootDir: string,
    {
        ignorePatterns = ignoredPatterns,
        extensionToLang = defaultExtensionToLang,
        prompts = defaultPrompt,
    }: GetCodeMDOptions = {}
): string {
    // Allowed file extensions to scan
    const allowedExtensions: string[] = Object.keys(extensionToLang);

    /**
     * Returns the language name for a given file based on its extension.
     */
    function getLanguageForFile(filePath: string): string {
        const ext = path.extname(filePath).toLowerCase();
        return extensionToLang[ext] || '';
    }

    // Read tsconfig.json content
    const tsConfigPath = path.join(rootDir, 'tsconfig.json');
    const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');

    // Read package.json content
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const projectName = JSON.parse(packageJsonContent).name;

    // Get the list of source files from tsconfig.json
    let files: string[] = getSourceFilesFromTsConfig(rootDir);

    // Filter files based on allowed extensions and ignore patterns
    files = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext) && !isIgnored(file, ignorePatterns, rootDir);
    });

    // Sort files alphabetically by their path relative to the root directory
    files.sort((a, b) => {
        const relA = path.relative(rootDir, a);
        const relB = path.relative(rootDir, b);
        return relA.localeCompare(relB);
    });

    // Begin building the Markdown content
    const mdContent = [...Object.values(prompts)];
    mdContent.push(`# Project "${projectName}"`, "");

    // Append tsconfig.json content
    mdContent.push('## tsconfig.json', '');
    mdContent.push('```json');
    mdContent.push(tsConfigContent);
    mdContent.push('```', '');

    // Append package.json content
    mdContent.push('## package.json', '');
    mdContent.push('```json');
    mdContent.push(packageJsonContent + '');
    mdContent.push('```', '');

    // Append each source file's content
    files.forEach((filePath) => {
        const relativePath = path.relative(rootDir, filePath);
        mdContent.push(`## ${relativePath.replace(/\\/g, '/')}`, '');

        // Read file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const language = getLanguageForFile(filePath);

        // Append file content with syntax highlighting
        mdContent.push(`\`\`\`${language}\n${fileContent}\n\`\`\``, '');
    });

    // Ensure the output directory exists
    const outputDir = path.join(rootDir, 'docs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return mdContent.join('\n');
}
