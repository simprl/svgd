import fs from 'fs';
import path from 'path';
import { generateSvgConstants } from './generate';
import type { CLIOptions } from "./parseCliArgs";
import type { GeneratedFile } from './generate';
import { parseCliArgs } from './parseCliArgs';

/**
 * Main entry point for the CLI. It parses arguments, generates
 * the output, and writes the result to disk.
 */
async function runCLI(argv: string[]) {
    // 1) Parse command-line arguments
    const options = parseCliArgs(argv);

    // 2) Generate constants from SVG
    const generatedFiles: GeneratedFile[] = await generateSvgConstants(options);

    // 3) Write each result to disk
    generatedFiles.forEach(({ path: outputFilePath, content }) => {
        ensureDirectoryExistence(outputFilePath);
        fs.writeFileSync(outputFilePath, content, 'utf8');
        console.log(`Constants file successfully created: ${outputFilePath}`);
    });
}


/**
 * Ensures that the directory for filePath exists.
 */
function ensureDirectoryExistence(filePath: string): void {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

export { generateSvgConstants, runCLI };
export type { CLIOptions, GeneratedFile };
