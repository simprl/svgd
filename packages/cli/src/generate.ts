import path from 'path';
import { optimize } from "svgo";
import { getSvgoConfig, generateConstantName, generateFileName, getSvgFileNames, getPng, getSvg } from "@svgd/utils";
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
    rows: string[];
    path: string;
    fileTemplate?: (rows: string) => string;
    rowTemplate: (rows: TemplateProps) => string;
}

const config = getSvgoConfig();

/**
 * generateSvgConstants performs the main logic:
 * 1) Search for all .svg files under the given folder.
 * 2) Process each SVG file, build a constant name, etc.
 * 3) Return an array of GeneratedFile.
 */
export async function generateSvgConstants(options: CLIOptions): Promise<GeneratedFile[]> {
    const root = process.cwd();

    const baseDir = path.resolve(root, options.input);

    // Find all .svg files inside `baseDir`.
    const svgFiles = getSvgFileNames(baseDir);

    const singleQuote = options.quote;
    const quote = singleQuote ? "'" : '"';

    const outputs = new Map<string, FileRawData>();

    let md: FileRawData | undefined;
    if (options.md) {
        md = {
            rows: [],
            fileTemplate: mdFileTemplate,
            rowTemplate: mdRowTemplate,
            path: path.resolve(root, options.md)
        };
        outputs.set(md.path, md)
    }

    let html: FileRawData | undefined;
    if (options.html) {
        html = {
            rows: [],
            fileTemplate: htmlFileTemplate,
            rowTemplate: htmlRowTemplate,
            path: path.resolve(root, options.html)
        };
        outputs.set(html.path, html)
    }

    await Promise.all(svgFiles.map(async (file, index) => {
        try {
            const getRelativePath = getRelativePathFactory(file);

            const constantName = generateConstantName(
                file,
                baseDir,
                options.template,
                options.format
            );
            const outputFileName = generateFileName(file, baseDir, options.output);
            const outputFilePath = path.resolve(root, outputFileName);

            let constants = outputs.get(outputFilePath);
            if (!constants) {
                constants = {
                    rows: [],
                    path: outputFilePath,
                    rowTemplate: options.dts ? jsRowTemplate : jsRowTemplateWithJSDoc
                };
                outputs.set(outputFilePath, constants);
            }

            let dts: FileRawData | undefined;
            if (options.dts) {
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

            const d = optimize(readFileSync(file, 'utf8'), config).data;
            const svg = getSvg(d);
            const png = await getPng(svg);

            const templateProps: Omit<TemplateProps, "relativePath"> = {
                name: constantName,
                d,
                quote,
                svg,
                image: `![](data:image/png;base64,${png})`,
                filePath: path.relative(baseDir, file).split('\\').join('/')
            }

            constants.rows.push(constants.rowTemplate( {
                ...templateProps,
                relativePath: getRelativePath(outputFilePath)
            }));

            dts?.rows.push(dts.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(dts.path)
            }));

            md?.rows.push(md.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(md.path)
            }));

            html?.rows.push(html.rowTemplate({
                ... templateProps,
                relativePath: getRelativePath(html.path)
            }));

        } catch (error) {
            console.error(`Error processing svg file ${file}:`, error);
        }

        if ((index + 1) % 100 === 0) {
            console.log(`Processed svg files: ${index + 1}/${svgFiles.length}`);
        }
    }));

    return [...outputs.entries()].map(([outPath, rawData]) => {
        const content = rawData.rows.join('\n');
        return {
            path: outPath,
            content: rawData.fileTemplate ? rawData.fileTemplate(content) : content,
        };
    });
}

const getRelativePathFactory = (file: string) => (absolutePath: string) => (
    path.relative(path.dirname(absolutePath), file).split('\\').join('/')
);
