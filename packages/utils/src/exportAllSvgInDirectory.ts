import { existsSync, readdirSync, statSync } from "fs";
import path from "path";

/**
 * Recursively collects all SVG files in a directory.
 * @param dir - The directory to search.
 * @param fileList - Accumulator for file paths.
 * @returns An array of SVG file paths.
 */
export function collectSvgsInDirectory(dir: string, fileList: string[] = []): string[] {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Recursive descent
            collectSvgsInDirectory(fullPath, fileList);
        } else {
            // Check extension
            if (/\.(svg)$/i.test(entry.name)) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

/**
 * Generates import statements for SVG files.
 * @param purePath - The pure directory path.
 * @param projectRoot - The project root directory.
 * @returns A string of import statements.
 */
export function exportAllSvgInDirectory(purePath: string, projectRoot: string): string {
    // Ensure the directory exists
    if (!existsSync(purePath)) {
        throw new Error(`Directory does not exist: ${purePath}`);
    }
    const stats = statSync(purePath);
    if (!stats.isDirectory()) {
        throw new Error(`Path is not a directory: ${purePath}`);
    }

    // Recursively collect .svg files
    const svgFiles = collectSvgsInDirectory(purePath);

    const imports = svgFiles.map((svgFile, i) => {
        const relativePath = svgFile.replace(/\\/g, '/');
        return `export { default as icon${i} } from "${relativePath}?path";`;
    });
    return imports.join('\r\n');
}
