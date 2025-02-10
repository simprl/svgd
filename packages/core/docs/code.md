# Project Files

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
      "@svgo/core": ["src/index"]
    }
  },
  "include": ["src", "tests", "scripts"]
}

```

## package.json

```json
{
  "name": "@svgd/core",
  "version": "0.3.1",
  "description": "An SVG optimization tool that converts SVG files into a single path 'd' attribute string for efficient storage and rendering.",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "build": "tsup",
    "lint": "eslint",
    "test": "vitest tests/stories/stories.test.ts",
    "codeDoc": "tsx scripts/codeDoc.ts",
    "useCasesDoc": "tsx scripts/useCasesDoc.ts"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/node": "^18.19.71",
    "codools": "*",
    "svgo": "^3.3.2",
    "tsup": "^8.3.5",
    "typescript": "^5.7.3",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^3.0.5",
    "tsx": "^4.19.2"
  },
  "keywords": [
    "svg",
    "svgd",
    "svgo",
    "path",
    "pathD",
    "optimize",
    "compression",
    "svg-to-path",
    "d-attribute",
    "svg-conversion",
    "svg-minification",
    "svg-parser",
    "svg-storage",
    "svg-icons",
    "vector-graphics",
    "svgo-plugin",
    "svg-transform",
    "svg-utils"
  ]
}

```

## scripts\codeDoc.ts

```typescript
import { getCodeMD, getESMDir, saveMD } from "codools";

saveMD("code.md", getCodeMD(getESMDir(import.meta.url, "..")));

```

## scripts\useCasesDoc.ts

```typescript
import { getApiMD, saveMD } from "codools";
import { stories as getPaths } from "tests/stories/getPaths/stories";
import { stories as getSvg } from "tests/stories/getSvg/stories";
import { stories as getSvgoConfig } from "tests/stories/getSvgoConfig/stories";

saveMD("api.md", [
    getApiMD({ title: "getSvgoConfig", stories: getSvgoConfig }),
    getApiMD({ title: "getPaths", stories: getPaths }),
    getApiMD({ title: "getSvg", stories: getSvg }),
].join("\n---\n\n"));

```

## src\commands.ts

```typescript
export interface PathAttributes {
    d: string;
    opacity?: string;
    "fill-opacity"?: string;
    stroke?: string;
    fill?: string;
    "stroke-width"?: string;
}

export interface Comand {
    code: string,
    attribute: keyof PathAttributes,
    regexp: string,
    toAttribute: (codeValue: string) => string,
    toCommand: (attributeValue: string) => string,
}

export const commands: Comand[] = [
    {
        code: "o",
        attribute: "opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "O",
        attribute: "fill-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "f",
        attribute: "stroke",
        regexp: "[0-9a-fA-F]+",
        toAttribute: (codeValue) => `#${codeValue}`,
        toCommand: (attributeValue) => attributeValue.replace(/^#/, ''),
    },
    {
        code: "F",
        attribute: "fill",
        regexp: "[0-9a-fA-F]+",
        toAttribute: (codeValue) => `#${codeValue}`,
        toCommand: (attributeValue) => attributeValue.replace(/^#/, ''),
    },
    {
        code: "w",
        attribute: "stroke-width",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    }
]

```

## src\defaultConfig.ts

```typescript
import { Config } from 'svgo';
import { ResizeParams } from "./resizePlugin";

export interface SVGDConfig {
    resize: ResizeParams;

    svgo: Config;
}

export const defaultConfig: SVGDConfig = {
    resize: {
        targetViewBox: {
            minX: 0,
            minY: 0,
            width: 24,
            height: 24,
        }
    },
    svgo: {
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        convertShapeToPath: false,
                        convertColors: false,
                        mergePaths: false,
                        moveElemsAttrsToGroup: false,
                        moveGroupAttrsToElems: false,
                    },
                },
            },
            {
                name: 'convertShapeToPath',
                params: {
                    convertArcs: true,
                },
            },
            {
                name: 'mergePaths',
                params: {
                    force: true,
                },
            },
            {
                name: 'convertColors',
                params: {
                    currentColor: false,
                    names2hex: true,
                    rgb2hex: true,
                    shorthex: true,
                    shortname: false,
                },
            },
            {
                name: 'moveGroupAttrsToElems',
            },
            {
                name: 'collapseGroups',
            },
            {
                name: "convertPathData",
            },
        ],
    }
};

```

## src\getPaths.ts

```typescript
import { commands, PathAttributes } from "./commands";


export function getPaths(d: string): PathAttributes[] {
    const paths: PathAttributes[] = [];
    let attributes: Partial<PathAttributes> = {};

    const pathCommands: string[] = d.split(new RegExp(
        `(${commands.map(cmd => `${cmd.code}${cmd.regexp}`).join('|')})`
    ));
    pathCommands.forEach((text, i) => {
        const isCommand = i % 2 === 1;
        if (isCommand) {
            commands.forEach(({ code, attribute, regexp, toAttribute }) => {
                const match = text.match(new RegExp(`^${code}(${regexp})$`));
                if (match) {
                    attributes[attribute] = toAttribute(match[1]);
                }
            });
            return;
        }
        const d = text.trim();
        if (d) {
            paths.push({ ...attributes, d });
            attributes = {};
        }
    });

    return paths;
}

```

## src\getSvg.ts

```typescript
import { getPaths } from "./getPaths";
import type { ViewBox } from "./resizePlugin";

export function getSvg(d: string, viewbox?: ViewBox): string {
    const svgParts = getPaths(d).map((attributes) => (
        `<path ${attributes ? Object.entries(attributes).map(([k, v]) => `${k}="${v}"`).join(' ') : ''} />`
    ));
    const { minX = 0, minY = 0, width = 24, height = 24 } = viewbox ?? {};
    const content = svgParts.length ? `
  ${svgParts.join(`
  `)}
` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="${width}" height="${height}">${content}</svg>`;
}

```

## src\getSvgoConfig.ts

```typescript
import { defaultConfig } from "./defaultConfig";
import { XastChild, XastRoot } from "svgo/lib/types";
import type { Config, CustomPlugin } from "svgo";
import { resizePlugin } from "./resizePlugin";
import { commands } from "./commands";

export const getSvgoConfig = (config = defaultConfig): Config => {
    return {
        ...config.svgo,
        plugins: [
            resizePlugin(config.resize),
            ...(config.svgo.plugins ?? []),
            extractPathDPlugin(),
        ],
    };
}

export const extractPathDPlugin = (): CustomPlugin => ({
    name: 'extractPathD',
    fn: (ast: XastRoot) => {
        const collectPathsContext: CollectPathsContext = {
            paths: [],
            wasCommand: false,
        }
        collectPaths(ast, collectPathsContext);
        ast.children = [{
            type: "text",
            value: collectPathsContext.paths.join(' ')
        }];
        return null;
    },
});

interface CollectPathsContext {
    paths: string[];
    wasCommand: boolean;
}

const collectPaths = (node: XastChild | XastRoot, context: CollectPathsContext ) => {
    if (
        node.type === 'element' &&
        !['path', 'g', 'svg', 'title'].includes(node.name)
    ) {
        throw new Error(`[SVGD ERROR] svg has other tag "${node.name}"`);
    }
    if (
        node.type === 'element' &&
        node.name === 'path' &&
        node.attributes.d &&
        node.attributes.fill !== 'none'
    ) {
        const { attributes } = node;
        const d = attributes.d;
        const commandsArray: string[] = [];

        commands.forEach(({ code, toCommand, attribute }) => {
            if (attribute in attributes) {
                commandsArray.push(`${code}${toCommand(attributes[attribute])}`);
            }
        });

        if (commandsArray.length) {
            context.wasCommand = true;
            context.paths.push(...commandsArray);
        } else if (context.wasCommand) {
            context.paths.push("o1");
        }
        context.paths.push(d);
    }
    if ("children" in node) {
        node.children.forEach((node) => collectPaths(node, context));
    }
};

```

## src\index.ts

```typescript
export { getPaths } from './getPaths';
export { getSvg } from './getSvg';
export { getSvgoConfig } from './getSvgoConfig';
export { defaultConfig } from './defaultConfig';

export type { SVGDConfig } from "./defaultConfig";
export type { ResizeParams } from "./resizePlugin";
export type { PathAttributes, Comand } from "./commands";

```

## src\resizePlugin.ts

```typescript
import { CustomPlugin } from 'svgo';
import { XastElement, XastRoot } from 'svgo/lib/types';

export interface ViewBox {
    minX: number;
    minY: number;
    width: number;
    height: number;
}

export interface ResizeParams {
    targetViewBox: ViewBox;
    overrideSvgAttributes?: boolean;
    preserveAspectRatio?: boolean;
}

/**
 * Resizes an SVG by wrapping its content in a <g> transform element.
 */
export function resizePlugin(params: ResizeParams): CustomPlugin {
    return {
        name: 'resizePlugin',
        fn: (ast) => {
            const svgNode = getSvgNode(ast);
            if (!svgNode) return null;

            const originalDims = getOriginalDimensions(svgNode);
            const transform = computeTransformations(originalDims, params);
            wrapChildrenInGroup(svgNode, transform);
            overrideSvgAttributesIfNeeded(svgNode, params);

            return null;
        },
    };
}

function getSvgNode(ast: XastRoot): XastElement | undefined {
    return ast.children.find(
        (node) => node.type === 'element' && node.name === 'svg'
    ) as XastElement | undefined;
}

/**
 * Extracts original dimensions from an SVG node.
 */
function getOriginalDimensions(svgNode: XastElement): ViewBox {
    const viewBox = svgNode.attributes.viewBox;

    if (viewBox) {
        const [minX, minY, width, height] = viewBox.split(/[\s,]+/).map(parseFloat);
        return { minX, minY, width, height };
    }

    return {
        minX: 0,
        minY: 0,
        width: parseFloat(svgNode.attributes.width ?? '100'),
        height: parseFloat(svgNode.attributes.height ?? '100'),
    };
}

/**
 * Computes the transformations (translate and scale) for resizing an SVG.
 */
function computeTransformations(originalDims: ViewBox, params: ResizeParams): string {
    const { targetViewBox, preserveAspectRatio = true } = params;
    const { minX: origMinX, minY: origMinY, width: origWidth, height: origHeight } = originalDims;
    const { minX, minY, width, height } = targetViewBox;

    const scaleX = width / origWidth;
    const scaleY = height / origHeight;
    const scale = preserveAspectRatio ? Math.min(scaleX, scaleY) : NaN;

    const translateX =
        minX - origMinX * (preserveAspectRatio ? scale : scaleX) +
        (preserveAspectRatio ? (width - origWidth * scale) / 2 : 0);

    const translateY =
        minY - origMinY * (preserveAspectRatio ? scale : scaleY) +
        (preserveAspectRatio ? (height - origHeight * scale) / 2 : 0);

    if (preserveAspectRatio) {
        return `translate(${translateX}, ${translateY}) scale(${scale}, ${scale})`;
    }
    return `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`;
}

/**
 * Wraps the current children of an SVG node in a <g> element
 * with the specified transform attribute.
 */
function wrapChildrenInGroup(svgNode: XastElement, transform: string): void {
    const groupNode: XastElement = {
        type: 'element',
        name: 'g',
        attributes: { transform },
        children: [],
    };

    groupNode.children = svgNode.children.splice(0, svgNode.children.length);
    svgNode.children.push(groupNode);
}

/**
 * Optionally overrides the SVG node attributes with the new viewBox
 * and removes width/height attributes.
 */
function overrideSvgAttributesIfNeeded(svgNode: XastElement, params: ResizeParams): void {
    const { overrideSvgAttributes = true, targetViewBox } = params;
    if (!overrideSvgAttributes) return;

    const { minX, minY, width, height } = targetViewBox;
    svgNode.attributes.viewBox = `${minX} ${minY} ${width} ${height}`;
    delete svgNode.attributes.width;
    delete svgNode.attributes.height;
}

```

