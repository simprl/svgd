# Project "@svgd/cli"

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,

    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    "moduleResolution": "Node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src", "tests", "scripts"]
}

```

## package.json

```json
{
  "name": "@svgd/cli",
  "version": "1.0.0",
  "description": "CLI tool to generate constants from SVG files",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "bin": {
    "svgd": "./dist/cli.js"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./cli": {
      "import": "./dist/cli.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "test": "vitest run tests/stories/stories.test.ts",
    "docs": "npm run codeDoc && npm run useCasesDoc",
    "lint": "eslint",
    "codeDoc": "tsx scripts/codeDoc",
    "useCasesDoc": "tsx scripts/useCasesDoc"
  },
  "files": [
    "dist"
  ],
  "dependencies": {
    "commander": "^12.1.0",
    "@svgd/utils": "*",
    "svgo": "^3.3.2"
  },

  "devDependencies": {
    "@types/node": "^18.19.71",
    "tsup": "^8.3.5",
    "typescript": "5.7.3",
    "codools": "*"
  }
}

```

## src\cli.ts

```typescript
#!/usr/bin/env node
import { runCLI } from "./index";

await runCLI(process.argv);

```

## src\generate.ts

```typescript
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

```

## src\index.ts

```typescript
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

```

## src\parseCliArgs.ts

```typescript
import { createCommand } from 'commander';

/**
 * CLIOptions represent the final parsed arguments from the CLI.
 */
export interface CLIOptions {
    input: string;
    output: string;
    quote: boolean;
    template: string;
    format: 'camelCase' | 'PascalCase' | 'snake_case' | 'SCREAMING_SNAKE_CASE';
    md?: string;
    html?: string;
    dts?: boolean;
}

/**
 * parseCliArgs takes the process.argv and parses it using commander.
 * It returns a CLIOptions object with the recognized arguments.
 */
export function parseCliArgs(argv: string[]): CLIOptions {
    const program = createCommand();
    program
        .version('1.0.5')
        .description('CLI tool to generate constants from SVG files')
        .option('-i, --input <directory>', 'Input directory containing SVG files', 'src/assets/icons')
        .option('-o, --output <file>', 'Output file path or pattern', 'src/components/Icon/paths.js')
        .option('-q, --quote', 'Use single quotes in the output', false)
        .option('-t, --template <string>', 'Template string for naming convention', '')
        .option('-m, --md <string>', 'Path to the output MD file', '')
        .option('-h, --html <string>', 'Path to the output HTML file', '')
        .option('-d, --dts <boolean>', 'Path to the output HTML file', false)
        .option(
            '-f, --format <format>',
            'Naming format: camelCase, PascalCase, snake_case, or SCREAMING_SNAKE_CASE',
            'camelCase'
        )
        .parse(argv);

    return program.opts<CLIOptions>();
}

```

## src\templates.ts

```typescript
export interface TemplateProps {
    quote: string;
    filePath: string;
    relativePath: string;
    name: string;
    d: string;
    image: string;
    svg: string;
}

export const jsRowTemplate = ({name, d, quote}: TemplateProps) =>
`export const ${name} = ${quote}${d}${quote};
`;

export const jsRowTemplateWithJSDoc = ({name, d, image, quote, filePath}: TemplateProps) =>
`/**
 * @filepath ${filePath}
 * @var ${image}
 */
export const ${name} = ${quote}${d}${quote};
`;

export const dtsRowTemplate = ({name, image, filePath}: TemplateProps) =>
`/**
 * @filepath ${filePath}
 * @var ${image}
 */
export const ${name}: string;
`;

export const mdRowTemplate = ({name, filePath, relativePath}: TemplateProps) =>
    `|  ![](${relativePath}) | ${name} | ${filePath} |`;

export const mdFileTemplate = (rows: string) => `# List of icons
| Source | Name | Path |
|---|---|---|
${rows}
`;

export const htmlRowTemplate = ({name, filePath, svg}: TemplateProps) =>
    `<tr><td>${svg}</td><td>${name}</td><td>${filePath}</td></tr>`;

export const htmlFileTemplate = (rows: string) => `<!DOCTYPE html>
<html lang="">
    <head>
        <style>
            table {
                border-collapse: collapse;
            }
            th {
                text-align: center;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
            td {
                text-align: left;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
        </style>
    </head>
    <body>
        <table>
            <tr><th>Icon</th><th>Name</th><th>Path</th></tr>

${rows}

        </table>
    </body>
</html>
`;

```

