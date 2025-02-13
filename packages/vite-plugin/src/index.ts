import {PluginOption} from "vite";
import { existsSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { getExports, getDTS, getSvgoConfig, getSvgFileNames } from 'svgd-utils';
import { optimize } from "svgo";

import type { DCollection } from 'svgd-utils';

const svgoConfig = getSvgoConfig();

export default function svgDExtractorPlugin(): PluginOption {
    let projectRoot = '';
    const dList: DCollection = {};

    return {
        name: 'svg-d-extractor',
        enforce: 'pre',
        configResolved(config) {
            projectRoot = path.resolve(config.root, 'src');
        },
        resolveId(source, importer) {
            if (importer && source.includes('?svgd')) {
                const pureSource = source.replace('?svgd', '');

                const importerDir = path.dirname(importer);
                const dirPath = path.resolve(importerDir, pureSource);

                // Check if directory exists
                if (existsSync(dirPath) && statSync(dirPath).isDirectory()) {
                    // Return virtual ID with unique prefix
                    return `\0svgd:${dirPath}`;
                } else {
                    throw new Error(`Directory does not exist: ${dirPath}`);
                }
            }
            return null; // Pass to other plugins
        },
        load(id) {
            const [filePath, query] = id.split('?');
            if (
                !filePath.endsWith('.svg') ||
                !query?.endsWith('path') ||
                filePath.startsWith('/')
            ) {
                if (!id.startsWith('\0svgd:') || filePath.startsWith('/')) {
                    return null;
                }
                return exportAllSvgInDirectory(filePath.slice('\0svgd:'.length));
            }

            const combinedD = optimize(readFileSync(filePath, 'utf8'), svgoConfig).data;

            dList[combinedD] = { d: combinedD, filePath };
            return `export default ${JSON.stringify(combinedD)};`;

        },
        async generateBundle(options, bundle) {
            for (const [fileName, chunk] of Object.entries(bundle)) {
                if (chunk.type !== 'chunk') {
                    continue;
                }

                const ast = this.parse(chunk.code);
                const exports = getExports({ ast, dList });
                const dts = await getDTS(exports);
                this.emitFile({
                    type: 'asset',
                    fileName: `types/${fileName}.d.ts`,
                    source: dts,
                });
            }
        },
    };
}


export function exportAllSvgInDirectory(purePath: string): string {
    const svgFiles = getSvgFileNames(purePath);

    const imports = svgFiles.map((svgFile, i) => {
        const relativePath = svgFile.replace(/\\/g, '/');
        return `export { default as icon${i} } from "${relativePath}?path";`;
    });
    return imports.join('\r\n');
}
