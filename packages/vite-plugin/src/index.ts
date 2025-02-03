import {PluginOption} from "vite";
import { existsSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { getExports, getDTS, parseSvg, exportAllSvgInDirectory } from 'svgd-utils';
import type { DCollection } from 'svgd-utils';

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
                return exportAllSvgInDirectory(filePath.slice('\0svgd:'.length), projectRoot);
            }

            const combinedD = parseSvg(readFileSync(filePath, 'utf8'));

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
