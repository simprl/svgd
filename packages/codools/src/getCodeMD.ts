import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { minimatch } from 'minimatch';

// Mapping file extensions to syntax highlighting languages
const extensionToLang: Record<string, string> = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.json': 'json',
    '.html': 'html',
    '.css': 'css',
};

// Allowed file extensions to scan
const ALLOWED_EXTENSIONS: string[] = Object.keys(extensionToLang);

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
 * Returns the language name for a given file based on its extension.
 */
function getLanguageForFile(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    return extensionToLang[ext] || '';
}

export const ignoredPatterns = ['node_modules/**', 'dist/**', 'tests/**', 'scripts/**', 'build/**', '**/*.test.ts'];

/**
 * Generates a Markdown file listing:
 * 1. The tsconfig.json content,
 * 2. The package.json content,
 * 3. All source files (from tsconfig.json) that have allowed extensions,
 *    excluding those that match ignore patterns.
 */
export function getCodeMD(rootDir: string, ignorePatterns: string[] = ignoredPatterns): string {
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
        return ALLOWED_EXTENSIONS.includes(ext) && !isIgnored(file, ignorePatterns, rootDir);
    });

    // Sort files alphabetically by their path relative to the root directory
    files.sort((a, b) => {
        const relA = path.relative(rootDir, a);
        const relB = path.relative(rootDir, b);
        return relA.localeCompare(relB);
    });

    // Begin building the Markdown content
    let mdContent = `# Project "${projectName}"\n\n`;

    // Append tsconfig.json content
    mdContent += '## tsconfig.json\n\n';
    mdContent += '```json\n';
    mdContent += tsConfigContent + '\n';
    mdContent += '```\n\n';

    // Append package.json content
    mdContent += '## package.json\n\n';
    mdContent += '```json\n';
    mdContent += packageJsonContent + '\n';
    mdContent += '```\n\n';

    // Append each source file's content
    files.forEach((filePath) => {
        const relativePath = path.relative(rootDir, filePath);
        mdContent += `## ${relativePath.replace('\\', '/')}\n\n`;

        // Read file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const language = getLanguageForFile(filePath);

        // Append file content with syntax highlighting
        mdContent += `\`\`\`${language}\n${fileContent}\n\`\`\`\n\n`;
    });

    // Ensure the output directory exists
    const outputDir = path.join(rootDir, 'docs');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    return mdContent;
}
