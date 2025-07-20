I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use Clean Code, Clean Architecture, SOLID, Atomic design
If something is unclear or needs clarification, feel free to ask me.
# Project "@svgd/core"

## package.json

```json
{
  "name": "@svgd/core",
  "version": "0.3.29",
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
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "test": "vitest run tests/stories/stories.test.ts",
    "docs": "codools --root . --output docs/code.md && tsx scripts/useCasesDoc",
    "lint": "eslint"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "@svgd/mocks": "*",
    "@types/node": "^18.19.71",
    "codools": "^0.2.17",
    "svgo": "^3.3.2",
    "tsup": "^8.3.5",
    "tsx": "^4.19.2",
    "typescript": "^5.7.3",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^3.0.5"
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

## src/commands.ts

```typescript
export interface PathAttributes {
    d: string;
    opacity?: string;
    "fill-opacity"?: string;
    "stroke-opacity"?: string;
    stroke?: string;
    fill?: string;
    "stroke-width"?: string;
    "fill-rule"?: string;
}

export interface Comand {
    code: string,
    attribute: keyof PathAttributes,
    regexp: string,
    toAttribute: (codeValue: string) => string,
    toCommand: (attributeValue: string) => string | null,
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
        code: "of",
        attribute: "fill-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "os",
        attribute: "stroke-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "f",
        attribute: "stroke",
        regexp: "[#0-9a-zA-Z]+",
        toAttribute: (codeValue) => {
            switch (codeValue) {
                case 'c': return 'currentColor';
                case 'n': return 'none';
                default: return codeValue;
            }
        },
        toCommand: (attributeValue) => {
            switch (attributeValue) {
                case 'currentColor': return 'c';
                case 'none': return 'n';
                default: return attributeValue;
            }
        },
    },
    {
        code: "F",
        attribute: "fill",
        regexp: "[#0-9a-zA-Z]+",
        toAttribute: (codeValue) => {
            switch (codeValue) {
                case 'c': return 'currentColor';
                case 'n': return 'none';
                default: return codeValue;
            }
        },
        toCommand: (attributeValue) => {
            switch (attributeValue) {
                case 'currentColor': return null;
                case 'none': return 'n';
                default: return attributeValue;
            }
        },
    },
    {
        code: "w",
        attribute: "stroke-width",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "e",
        attribute: "fill-rule",
        regexp: "",
        toAttribute: () => 'evenodd',
        toCommand: (attributeValue) => attributeValue === 'evenodd' ? '' : null,
    }
]

```


## src/defaultConfig.ts

```typescript
import { type Config } from 'svgo';
import { ResizeParams } from "./resizePlugin";

export interface SVGDConfig {
    resize: ResizeParams;
    colors?: boolean;
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
    colors: false,
    svgo: {
        plugins: [
            {
                name: 'removeAttrs',
                params: {
                    attrs: [
                        'overflow'
                    ]
                }
            },
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
                name: "inlineStyles",
                params: {
                    onlyMatchedOnce: false,
                }
            },
            {
                name: "convertStyleToAttrs",
            },
            {
                name: "removeUselessStrokeAndFill",
                params: {
                    stroke: true,
                    fill: true,
                    removeNone: true
                }
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
                name: 'moveGroupAttrsToElems',
            },
            {
                name: 'collapseGroups',
            },
            {
                name: "convertPathData",
            },
            {
                name: "removeHiddenElems",
            },
            {
                name: "removeUselessDefs",
            },
        ],
    }
};

```


## src/getPaths.ts

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


## src/getSvg.ts

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


## src/getSvgoConfig.ts

```typescript
import { defaultConfig } from "./defaultConfig";
import type { XastChild, XastRoot } from "svgo/lib/types";
import type { Config, CustomPlugin } from "svgo";
import { resizePlugin } from "./resizePlugin";
import { inlineUsePlugin } from "./inlineUsePlugin";
import { commands } from "./commands";
import { moveGroupOpacityToElementsPlugin } from "./moveGroupOpacityToElementsPlugin";

export const getSvgoConfig = (config = defaultConfig): Config => {
    const plugins = (config.svgo.plugins ?? []);
    const pluginsByColor = config.colors
        ? plugins
        : plugins.map((plugin) => (typeof plugin === "object" && plugin.name === "convertColors") ? {
            ...plugin,
            params: {
                currentColor: true
            }
        } : plugin);
    return {
        ...config.svgo,
        plugins: [
            inlineUsePlugin,
            moveGroupOpacityToElementsPlugin,
            resizePlugin(config.resize),
            ...pluginsByColor,
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
        node.attributes.d
    ) {
        const { attributes } = node;
        const d = attributes.d;
        const commandsArray: string[] = [];

        commands.forEach(({ code, toCommand, attribute }) => {
            if (attribute in attributes) {
                const commandValue = toCommand(attributes[attribute]);
                if (commandValue !== null) {
                    commandsArray.push(`${code}${commandValue}`);
                }
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


## src/index.ts

```typescript
export { getPaths } from './getPaths';
export { getSvg } from './getSvg';
export { getSvgoConfig } from './getSvgoConfig';
export { defaultConfig } from './defaultConfig';

export type { SVGDConfig } from "./defaultConfig";
export type { ResizeParams } from "./resizePlugin";
export type { PathAttributes, Comand } from "./commands";

```


## src/inlineUsePlugin.ts

```typescript
import type { CustomPlugin } from "svgo";
import type { XastNode } from "svgo/lib/types";

export const inlineUsePlugin: CustomPlugin = {
    name: 'inlineUse',
    fn: () => {
        const defsMap = new Map();
        function collectDefs(node: XastNode) {
            if (node.type === "element" || node.type === "root") {
                if (node.type === "element" && node.name === 'defs' && Array.isArray(node.children)) {
                    node.children = node.children.filter((defEl) => {
                        if(defEl.type !== "element" || defEl.name !== 'path') {
                            return true;
                        }
                        const {id, ...attributes} = defEl?.attributes ?? {};
                        if (id) {
                            defsMap.set(id, {...defEl, attributes });
                            return false;
                        }
                        return true;
                    });
                } else if (Array.isArray(node.children)) {
                    for (const child of node.children) {
                        collectDefs(child);
                    }
                }
            }

        }
        return {
            root: {
                enter(rootNode) {
                    collectDefs(rootNode);
                },
            },
            element: {
                enter(node, parentNode) {
                    if (node.name !== 'use') return;
                    const href = node.attributes.href || node.attributes['xlink:href'];
                    if (!href || !href.startsWith('#')) return;
                    const id = href.slice(1);
                    const defEl = defsMap.get(id);
                    if (!defEl) return;

                    // shallow clone of defEl + merge attributes
                    const clone = {
                        name: defEl.name,
                        type: defEl.type,
                        attributes: { ...defEl.attributes, ...node.attributes },
                        children: defEl.children
                    };

                    // replace <use> в parentNode.children
                    const idx = parentNode.children.indexOf(node);
                    if (idx >= 0) {
                        parentNode.children.splice(idx, 1, clone);
                    }
                }
            }
        };
    }
}

```


## src/moveGroupOpacityToElementsPlugin.ts

```typescript
import type { CustomPlugin } from "svgo";
import { XastElement } from "svgo/lib/types";

export const name = 'moveGroupAttrsToElems';
export const description =
    'moves some group attributes to the content elements';

const opacityAttibutes = ["opacity", "fill-opacity", "stroke-opacity"];

export const moveGroupOpacityToElementsPlugin: CustomPlugin = {
    name: 'inlineUse',
    fn: () => {
        return {
            element: {
                enter: (node) => {
                    if (
                        node.name === 'g' &&
                        node.children.length !== 0
                    ) {

                        const mergers = opacityAttibutes
                            .map((opacityAttibute) => getMergeOpacity(node, opacityAttibute))
                            .filter(Boolean) as Array<(node: XastElement) => void>;

                        for (const child of node.children) {

                            if (child.type === 'element') {
                                mergers.forEach((merge)=> merge(child));
                            }
                        }

                        opacityAttibutes.forEach((opacityAttibute)=>{
                            delete node.attributes[opacityAttibute];
                        })
                    }
                },
            },
        };
    }
}

function getMergeOpacity(parent: XastElement, attributeName: string) {
    if (!(attributeName in parent.attributes)) return null;
    const parentValue = parent.attributes[attributeName];
    const parsedParentValue = Number.parseFloat(parentValue);
    return (node: XastElement) => {
        if (node.type === 'element') {
            const value = node.attributes[attributeName];
            node.attributes[attributeName] = (value !== null && value !== undefined)
                ? String(Number.parseFloat(node.attributes[attributeName]) * parsedParentValue)
                : parentValue;

        }
    }
}

```


## src/resizePlugin.ts

```typescript
import type { CustomPlugin } from 'svgo';
import type { XastElement, XastRoot } from 'svgo/lib/types';

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

