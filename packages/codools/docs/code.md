I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use best practices (Clean Code, Clean Architecture, SOLID, Atomic design)
If something is unclear or needs clarification, feel free to ask me.
# Project "codools"

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "rootDir": ".",
    "outDir": "dist",
    "strict": true,

    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    "baseUrl": ".",
    "paths": {
      "codools": ["src/index"],
      "codools/tests": ["src/tests"]
    }
  },
  "include": ["src", "tests", "scripts"]
}

```

## package.json

```json
{
  "name": "codools",
  "version": "0.2.4",
  "description": "",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./tests": {
      "types": "./dist/tests.d.ts",
      "import": "./dist/tests.js",
      "require": "./dist/tests.cjs"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "test": "vitest run tests/stories/stories.test.ts",
    "docs": "tsx scripts/codeDoc && tsx scripts/useCasesDoc",
    "lint": "eslint"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "dependencies": {
    "typescript": "^5.7.3",
    "vitest": "^3.0.5",
    "minimatch": "^9.0.3"
  },
  "peerDependencies": {},
  "devDependencies": {
    "@types/node": "^18.19.71",
    "tsup": "^8.3.5",
    "vite-tsconfig-paths": "^5.1.4",
    "tsx": "^4.19.2",
    "@svgd/mocks": "*"
  },
  "keywords": []
}

```

## src/describeStory.ts

```typescript
import { test, expect, vi } from "vitest";
import { Story } from "src/types";

export const describeStories = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>(stories: Story<Input, Output>[]) => {
    stories.forEach((story, i) => {
        const title = ("title" in story) ? String(story.title) : `Test Case ${i}`;
        test(title, async () => {
            vi.doMock(`${story.dir}/data`, () => story.input);
            if (story.isThrow) {
                await expect(import(`${story.dir}/story`)).rejects.toThrow();
            } else {
                const output = await import(`${story.dir}/story?update=${Date.now()}`);

                Object.entries(story.output).forEach(([key, value]) => {
                    if (typeof output[key] === "string" && typeof value === "string") {
                        expect(output[key].trim().replace(/\r\n/g, '\n'), key).toEqual(value.trim().replace(/\r\n/g, '\n'));
                    } else {
                        expect(output[key], key).toEqual(value);
                    }
                })
            }
        });
    });
};

```

## src/getCodeMD.ts

```typescript
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

/**
 * Traverses the AST of a source file and finds all import declarations and require calls
 * where the imported module's extension is included in allowedExtensions.
 */
function findModuleImportsInAst(filePath: string, allowedExtensions: string[]): string[] {
    const content = fs.readFileSync(filePath, 'utf8');
    let foundImports: string[] = [];

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
            const moduleExt = path.extname(moduleName).toLowerCase();
            if (allowedExtensions.includes(moduleExt)) {
                foundImports.push(moduleName);
            }
        }
        // Handle require calls: const x = require('module')
        if (ts.isCallExpression(node) &&
            node.expression.getText(sourceFile) === 'require' &&
            node.arguments.length === 1 &&
            ts.isStringLiteral(node.arguments[0])
        ) {
            const moduleName = node.arguments[0].text;
            const moduleExt = path.extname(moduleName).toLowerCase();
            if (allowedExtensions.includes(moduleExt)) {
                foundImports.push(moduleName);
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    return foundImports;
}

export const ignoredPatterns = ['node_modules/**', 'dist/**', 'tests/**', 'scripts/**', 'build/**', '**/*.test.ts'];

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
 * it appends a list of detected import/require statements whose module paths
 * have extensions defined in extensionToLang.
 * For each detected import, instead of just listing the import string,
 * the content of the imported file (if found) is inserted as a code block.
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
    // Extensions for which we attempt AST parsing (typically code files)
    const astParsableExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

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
    const mdContent: string[] = [...Object.values(prompts)];
    mdContent.push(`# Project "${projectName}"`, "");

    // Append tsconfig.json content
    mdContent.push('## tsconfig.json', '');
    mdContent.push('```json');
    mdContent.push(tsConfigContent);
    mdContent.push('```', '');

    // Append package.json content
    mdContent.push('## package.json', '');
    mdContent.push('```json');
    mdContent.push(packageJsonContent);
    mdContent.push('```', '');

    const renderedImports = new Set();

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
        const language = getLanguageForFile(filePath);

        // Append file content with syntax highlighting
        mdContent.push(`\`\`\`${language}`, fileContent, '```', '');

        // If the file's extension is AST-parsable, analyze its import statements
        const ext = path.extname(filePath).toLowerCase();
        if (astParsableExtensions.has(ext)) {
            const detectedImports = findModuleImportsInAst(filePath, allowedExtensions);
            if (detectedImports.length > 0) {
                detectedImports.forEach((imp) => {
                    // Пытаемся вычислить абсолютный путь для импортированного модуля
                    let importedFileAbsolutePath: string | null = null;
                    // Обрабатываем только относительные или абсолютные пути
                    if (imp.startsWith('.') || imp.startsWith('/')) {
                        importedFileAbsolutePath = path.resolve(path.dirname(filePath), imp);
                    }
                    if (importedFileAbsolutePath && renderedImports.has(importedFileAbsolutePath) && fs.existsSync(importedFileAbsolutePath)) {
                        renderedImports.add(importedFileAbsolutePath);
                        let importedContent: string;
                        try {
                            importedContent = fs.readFileSync(importedFileAbsolutePath, 'utf8');
                        } catch (error) {
                            console.error(`Error reading imported file ${importedFileAbsolutePath}:`, error);
                            importedContent = '';
                        }
                        const importedLanguage = getLanguageForFile(importedFileAbsolutePath);
                        const innerFileName = path.relative(rootDir, importedFileAbsolutePath).replace(/\\/g, '/');
                        mdContent.push(`## ${innerFileName}`, '');
                        mdContent.push(`\`\`\`${importedLanguage}`, importedContent, '```', '');
                    } else {
                        mdContent.push(`#### ${imp} (file not found)`, '');
                    }
                });
                mdContent.push('');
            }
        }
    });

    // Ensure the output directory exists
    const outputDir = path.join(rootDir, 'docs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return mdContent.join('\n');
}

```

## src/getESMPath.ts

```typescript
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export interface ImportMeta {
    url: string;
}

export const getESMPath = (meta: ImportMeta, relativePath?: string) => {
    const root = dirname(fileURLToPath(meta.url));
    return relativePath ? resolve(root, relativePath) : root;
};

```

## src/getStoriesMD.ts

```typescript
import { resolve } from "path";
import { readFileSync } from "fs";
import { Story } from "src/types";
import { transformImports } from "src/transformer";

type ParsedStory = {
    isThrow: false;
    title: string;
    code: string;
    output: Record<string, unknown>;
} | {
    isThrow: true;
    title: string;
    code: string;
    output: undefined;
}
interface ParsedStories {
    title: string;
    stories: ParsedStory[];
}

const getMD = (stories: ParsedStories): string => {
    let md = `## ${stories.title}\n\n`;

    stories.stories.forEach(({ title, code, output, isThrow }, i) => {
        md += `### Use Case ${i + 1}. ${title}\n\n`;
        md += "#### Code:\n";
        md += "```ts\n" + code + "\n```\n\n";
        md += "#### Result:\n";
        md += isThrow ? "`Throw Error`" : "```json\n" + JSON.stringify(output, null, 2) + "\n```\n\n";
    });

    return md;
};

const getStories = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>(stories: Story<Input, Output>[]) => {
    return stories.map(({ dir, title, input, output, isThrow }, i) => {
        const storyFilePath = resolve(dir, `story.ts`);
        const code = readFileSync(storyFilePath, "utf8");
        const definedTitle = title ?? `Test Case ${i}`;
        const transformedCode = transformImports(storyFilePath, code, input);
        const useCase: ParsedStory = isThrow ? {
            title: definedTitle,
            code: transformedCode,
            output: undefined,
            isThrow: true,
        } : {
            title: definedTitle,
            code: transformedCode,
            output,
            isThrow: false,
        };
        return useCase;
    });
};

interface GetStoriesMDProps <Input extends Record<string, unknown>, Output extends Record<string, unknown>>{
    title: string;
    stories: Story<Input, Output>[];
}

export const getStoriesMD = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>({ title, stories }: GetStoriesMDProps<Input, Output>) => (
    getMD({ title, stories: getStories(stories) })
)


```

## src/index.ts

```typescript
export { useStory } from "./useStory";
export { transformImports } from "./transformer";
export { getStoriesMD } from "./getStoriesMD";
export { getCodeMD, ignoredPatterns, defaultExtensionToLang, defaultPrompt } from "./getCodeMD";
export { getESMPath } from "./getESMPath";
export { saveMD } from "./saveMD";
export type { UseStory } from "./useStory";
export type { Story } from "./types"

```

## src/saveMD.ts

```typescript
import { dirname } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export const saveMD = (filePath: string, content: string) => {
    const docsDir = dirname(filePath);
    if (!existsSync(docsDir)) mkdirSync(docsDir);

    writeFileSync(filePath, content, "utf8");
    console.log(`✅ Saved: ${filePath}`);
};

```

## src/tests.ts

```typescript
export { describeStories } from "./describeStory";

```

## src/transformer.ts

```typescript
import ts from 'typescript';

function transformImports(filePath: string, code: string, mockValues: Record<string, unknown>): string {
    const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.ESNext, true);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const transformer: ts.TransformerFactory<ts.Node> = (context) => {
        return (node) => {
            function visit(node: ts.Node): ts.Node | ts.Node[] {
                if (
                    ts.isImportDeclaration(node) &&
                    ts.isStringLiteral(node.moduleSpecifier) &&
                    node.moduleSpecifier.text === "./data"
                ) {
                    const importClause = node.importClause;
                    if (importClause && importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                        return importClause.namedBindings.elements.map((element) => {
                            const key = element.name.text;
                            const value = mockValues[key];
                            const initializer = createLiteralFromValue(key, value);
                            return ts.factory.createVariableStatement(
                                undefined,
                                ts.factory.createVariableDeclarationList(
                                    [
                                        ts.factory.createVariableDeclaration(
                                            ts.factory.createIdentifier(key),
                                            undefined,
                                            undefined,
                                            initializer
                                        ),
                                    ],
                                    ts.NodeFlags.Const
                                )
                            );
                        });
                    }
                }
                return ts.visitEachChild(node, visit, context);
            }
            const updatedNode = ts.visitNode(node, visit);
            return updatedNode as ts.SourceFile;
        };
    };

    const transformedSource = ts.transform(sourceFile, [transformer]);
    return  printer.printFile(transformedSource.transformed[0] as ts.SourceFile);
}

function createLiteralFromValue(key: string | undefined, value: unknown): ts.Expression {
    if (value === undefined) {
        return ts.factory.createStringLiteral("");
    }
    if (key === "importMeta") {
        return ts.factory.createMetaProperty(
            ts.SyntaxKind.ImportKeyword,
            ts.factory.createIdentifier("meta")
        )
    }
    if (typeof value === 'string') {
        return ts.factory.createStringLiteral(value);
    }
    if (typeof value === 'number') {
        return ts.factory.createNumericLiteral(value.toString());
    }
    if (typeof value === 'boolean') {
        return value ? ts.factory.createTrue() : ts.factory.createFalse();
    }
    if (value === null) {
        return ts.factory.createNull();
    }
    if (Array.isArray(value)) {
        const elements = value.map(item => createLiteralFromValue(undefined, item));
        return ts.factory.createArrayLiteralExpression(elements, false);
    }
    if (typeof value === 'object') {
        const properties = Object.entries(value).map(([key, val]) => {
            const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
            const keyName = isValidIdentifier
                ? ts.factory.createIdentifier(key)
                : ts.factory.createStringLiteral(key);
            return ts.factory.createPropertyAssignment(keyName, createLiteralFromValue(keyName.text, val));
        });
        return ts.factory.createObjectLiteralExpression(properties, true);
    }
    return ts.factory.createIdentifier("undefined");
}

export { transformImports };

```

## src/types.ts

```typescript

export type Story<Input, Output> = {
    input: Input;
    isThrow: false;
    output: Output;
    title: string;
    dir: string;
} | {
    input: Input;
    isThrow: true;
    output?: undefined;
    title: string;
    dir: string;
}

```

## src/useStory.ts

```typescript
import { Story } from "src/types";

interface UseStoryProps {
    dir: string;
}

interface DefMock {
    title?: string;
    isThrow?: boolean;
}

interface DescribeProps <Input extends Record<string, unknown>, Output extends Record<string, unknown>, Mock>{
    mocks: Mock[];
    input: (mock: Mock) => Input;
    output: (mock: Mock) => Output;
}

export interface UseStory <Input extends Record<string, unknown>, Output extends Record<string, unknown>>{
    getStories: <Mock extends DefMock>(props: DescribeProps<Input, Output, Mock>) => Story<Input, Output>[];
}

export const useStory = <
    Input extends Record<string, unknown>,
    Output extends Record<string, unknown>
>({ dir }: UseStoryProps): UseStory<Input, Output> => {
    return {
        getStories: ({ mocks, input, output }) => (
            mocks.map((mock, i) => mock?.isThrow ? ({
                isThrow: true,
                input: input(mock),
                output: undefined,
                title: mock?.title ?? String(i),
                dir
            }) : ({
                isThrow: false,
                input: input(mock),
                output: output(mock),
                title: mock?.title ?? String(i),
                dir
            }))
        ),
    };
}

```
