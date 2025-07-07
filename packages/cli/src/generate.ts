import path from 'path';
import {
    parseSvg,
    generateConstantName,
    generateFileName,
    getSvgFileNames,
    getPng,
    getSvg,
    defaultConfig,
    getSvgoConfig
} from "@svgd/utils";
import { readFileSync } from "fs";
import { CLIOptions } from "./parseCliArgs";
import {
    dtsRowTemplate,
    htmlFileTemplate,
    htmlRowTemplate,
    jsRowTemplate,
    jsRowTemplateWithJSDoc,
    mdFileTemplate,
    mdRowTemplate
} from "./templates";
import type { TemplateProps } from "./templates";

/**
 * GeneratedFile describes the final result for each output file:
 * the path and the text content with exported constants.
 */
export interface GeneratedFile {
    path: string;
    content: string;
}

interface FileRawData {
    rows: Row[];
    path: string;
    fileTemplate?: (rows: string) => string;
    rowTemplate: (rows: TemplateProps) => string;
}

interface Row {
    order: string;
    code: string;
}

const defoultOptions: CLIOptions = {
    input: "src/assets/icons",
    output: "src/components/Icon/paths.js",
    quote: false,
    template: "",
    format: "camelCase",
    colors: false,
    size: 24,
}

/**
 * generateSvgConstants performs the main logic:
 * 1) Search for all .svg files under the given folder.
 * 2) Process each SVG file, build a constant name, etc.
 * 3) Return an array of GeneratedFile.
 */
export async function generateSvgConstants(options: CLIOptions): Promise<GeneratedFile[]> {
    const root = process.cwd();

    const filledOptions = { ...defoultOptions, ...options };

    const baseDir = path.resolve(root, filledOptions.input);

    const svgoConfig = getSvgoConfig({
        ...defaultConfig,
        colors: filledOptions.colors,
        resize: {
            targetViewBox: {
                minX: 0,
                minY: 0,
                width: filledOptions.size ?? 24,
                height: filledOptions.size ?? 24,
            }
        }
    })

    // Find all .svg files inside `baseDir`.
    const svgFiles = getSvgFileNames(baseDir);

    const singleQuote = filledOptions.quote;
    const quote = singleQuote ? "'" : '"';

    const outputs = new Map<string, FileRawData>();

    let md: FileRawData | undefined;
    if (filledOptions.md) {
        md = {
            rows: [],
            fileTemplate: mdFileTemplate,
            rowTemplate: mdRowTemplate,
            path: path.resolve(root, filledOptions.md)
        };
        outputs.set(md.path, md)
    }

    let html: FileRawData | undefined;
    if (filledOptions.html) {
        html = {
            rows: [],
            fileTemplate: htmlFileTemplate,
            rowTemplate: htmlRowTemplate,
            path: path.resolve(root, filledOptions.html)
        };
        outputs.set(html.path, html)
    }

    await Promise.all(svgFiles.map(async (file, index) => {
        try {
            const getRelativePath = getRelativePathFactory(file);

            const constantName = generateConstantName(
                file,
                baseDir,
                filledOptions.template,
                filledOptions.format
            );
            const outputFileName = generateFileName(file, baseDir, filledOptions.output);
            const outputFilePath = path.resolve(root, outputFileName);

            let constants = outputs.get(outputFilePath);
            if (!constants) {
                constants = {
                    rows: [],
                    path: outputFilePath,
                    rowTemplate: filledOptions.dts ? jsRowTemplate : jsRowTemplateWithJSDoc
                };
                outputs.set(outputFilePath, constants);
            }

            let dts: FileRawData | undefined;
            if (filledOptions.dts) {
                const dtsOutputFilePath = outputFilePath.replace(/\.js|\.ts$/, ".d.ts");
                dts = outputs.get(dtsOutputFilePath);
                if (!dts) {
                    dts = {
                        rows: [],
                        path: dtsOutputFilePath,
                        rowTemplate: dtsRowTemplate
                    };
                    outputs.set(dtsOutputFilePath, dts);
                }
            }

            const d = parseSvg(readFileSync(file, 'utf8'), svgoConfig);
            const svg = getSvg(d);
            const png = await getPng(svg);

            const templateProps: Omit<TemplateProps, "relativePath"> = {
                name: constantName,
                d,
                quote,
                svg,
                image: `![](data:image/png;base64,${png})`,
                filePath: path.relative(baseDir, file).split('\\').join('/'),
                ts: /\.ts$/.test(outputFilePath),
            }

            const orderedRowItem = (code: string)  => ({
                order: constantName,
                code
            });

            constants.rows.push(orderedRowItem(constants.rowTemplate( {
                ...templateProps,
                relativePath: getRelativePath(outputFilePath)
            })));

            dts?.rows.push(orderedRowItem(dts.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(dts.path)
            })));

            md?.rows.push(orderedRowItem(md.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(md.path)
            })));

            html?.rows.push(orderedRowItem(html.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(html.path)
            })));

        } catch (error) {
            console.error(`Error processing svg file ${file}:`, error);
        }

        if ((index + 1) % 100 === 0) {
            console.log(`Processed svg files: ${index + 1}/${svgFiles.length}`);
        }
    }));

    return [...outputs.entries()].map(([outPath, rawData]) => {
        const content = rawData.rows
            .sort(({ order: a }, { order: b }) => a.localeCompare(b))
            .map(({ code }) => code)
            .join('\n');
        return {
            path: outPath,
            content: rawData.fileTemplate ? rawData.fileTemplate(content) : content,
        };
    });
}

const getRelativePathFactory = (file: string) => (absolutePath: string) => (
    path.relative(path.dirname(absolutePath), file).split('\\').join('/')
);
