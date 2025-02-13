# Project "@svgd/utils"

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
      "@svgd/utils": ["src/index"]
    }
  },
  "include": ["src", "tests", "scripts"]
}

```

## package.json

```json
{
  "name": "@svgd/utils",
  "version": "0.1.0",
  "description": "Utility functions to convert SVG to path d.",

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
    "test": "vitest run tests/stories/stories.test.ts",
    "docs": "npm run codeDoc && npm run useCasesDoc",
    "lint": "eslint",
    "codeDoc": "tsx scripts/codeDoc",
    "useCasesDoc": "tsx scripts/useCasesDoc"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "@types/node": "^18.19.71",
    "tsup": "^8.3.5"
  },
  "dependencies": {
    "estree-walker": "^3.0.3",
    "sharp": "^0.33.5",
    "@svgd/core": "*",
    "typescript": "^5.7.3"
  }
}

```

## src\exports\getDTS.ts

```typescript
import * as ts from 'typescript';
import { getSvg } from "@svgd/core";
import { getPng } from "../png";
import { Declaration, Declarations } from "./types";

export async function getDTS(declarations: Declarations): Promise<string> {
    const generateType = async (info: Declaration): Promise<ts.TypeNode> => {
        if ("d" in info) {
            return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
        }
        if ("children" in info) {
            const members: Promise<ts.TypeElement>[] = Object.entries(info.children).map(async ([key, child]) => {
                const typeNode = await generateType(child);
                const jsDocComment = await generateJsDoc(child);

                const propertySignature = ts.factory.createPropertySignature(
                    undefined,
                    key,
                    undefined,
                    typeNode
                );

                if (jsDocComment) {
                    ts.addSyntheticLeadingComment(
                        propertySignature,
                        ts.SyntaxKind.MultiLineCommentTrivia,
                        jsDocComment,
                        true
                    );
                }

                return propertySignature;
            });
            return ts.factory.createTypeLiteralNode(await Promise.all(members));
        }
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    };

    const textToComment = (text: string): string => text.replace(/\n/g, '\n * ');

    const generateJsDoc = async (info: Declaration): Promise<string | undefined> => {
        if ("d" in info) {
            const text = `![](data:image/png;base64,${await getPng(getSvg(info.d))})`;
            return `*
 * ${textToComment(text)}
 `;
        }
        return undefined;
    };

    const statements: Promise<ts.Statement>[] = Object.entries(declarations).map(async ([name, info]) => {
        const type = await generateType(info);
        const jsDocComment = await generateJsDoc(info);

        // Create the variable declaration
        const varDeclaration = ts.factory.createVariableDeclaration(name, undefined, type, undefined);

        // Create the variable statement with export modifier
        const varStatement = ts.factory.createVariableStatement(
            [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            ts.factory.createVariableDeclarationList([varDeclaration], ts.NodeFlags.Const)
        );

        // If there's a JSDoc comment, add it as a leading comment
        if (jsDocComment) {
            ts.addSyntheticLeadingComment(
                varStatement,
                ts.SyntaxKind.MultiLineCommentTrivia,
                jsDocComment,
                true
            );
        }

        return varStatement;
    });

    const sourceFile = ts.factory.createSourceFile(
        await Promise.all(statements),
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None
    );

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printFile(sourceFile);
}

```

## src\exports\getExports.ts

```typescript
import { walk } from "estree-walker";
import {
    Node,
    VariableDeclaration,
    Identifier,
    Literal,
    CallExpression,
    ObjectExpression,
    ExportSpecifier,
    SpreadElement,
    ExportNamedDeclaration,
    Property,
} from "estree";
import { DCollection, Declaration, Declarations } from "./types";


interface GetExportsProps {
    ast: Node;
    dList: DCollection;
}

/**
 * Extracts TypeScript declarations from the given AST and data map.
 * @param params - The parameters containing the AST and the data map.
 * @returns An array of export objects with names and associated info.
 */
export const getExports = ({ ast, dList }: GetExportsProps): Declarations => {
    const foundExports: Declarations = {};
    const declarations: Declarations = {};

    // First pass: Analyze variable declarations
    walk(ast, {
        enter(node) {
            if (node.type === "VariableDeclaration") {
                for (const decl of (node as VariableDeclaration).declarations) {
                    const result = analyzeDeclaration({
                        id: decl.id,
                        init: decl.init,
                        dCollection: dList,
                        declarations,
                    });
                    if (result) {
                        declarations[result.declName] = result.info;
                    }
                }
            }
        },
    });

    // Second pass: Analyze export declarations
    walk(ast, {
        enter(node) {
            if (node.type === "ExportNamedDeclaration") {
                const exportNamedDeclaration = node as ExportNamedDeclaration;
                if (
                    exportNamedDeclaration.specifiers &&
                    exportNamedDeclaration.specifiers.length > 0
                ) {
                    for (const spec of exportNamedDeclaration.specifiers as ExportSpecifier[]) {
                        const local = (spec.local as Identifier).name;
                        const exportedName = (spec.exported as Identifier).name;

                        if (local && exportedName) {
                            const info = declarations[local];
                            if (!info) {
                                console.log("!!! ExportNamedDeclaration in", exportedName, spec);
                            }
                            if (info) {
                                // Found an exported constant with associated info
                                foundExports[exportedName] = info;
                            }
                        }
                    }
                }
            }
        },
    });

    return foundExports;
};

/**
 * Interface for the parameters accepted by the analyzeDeclaration function.
 */
interface AnalyzeDeclarationParams {
    id: Node;
    init: Property["value"] | SpreadElement | null | undefined;
    dCollection: DCollection;
    declarations: Declarations;
}

/**
 * Interface for the result returned by the analyzeDeclaration function.
 */
interface AnalyzeDeclarationResult {
    declName: string;
    info: Declaration;
}

/**
 * Recursively analyzes a declaration node to extract relevant information.
 * @param params - The parameters for analyzing the declaration.
 * @returns An object containing the declaration name and its associated info, or undefined if not applicable.
 */
function analyzeDeclaration({ id, init, dCollection, declarations }: AnalyzeDeclarationParams): AnalyzeDeclarationResult | undefined {

    // Ensure the id is an Identifier
    if (id.type !== "Identifier") {
        return;
    }

    const declName = (id as Identifier).name;

    // Handle initialization with a string literal
    if (
        init &&
        init.type === "Literal" &&
        typeof (init as Literal).value === "string"
    ) {
        const literalValue = (init as Literal).value as string;
        const info = dCollection[literalValue];
        if (info) {
            return { declName, info };
        }
        return;
    }

    // Handle initialization with another identifier
    if (init && init.type === "Identifier") {
        const localName = (init as Identifier).name;
        const local = declarations[localName];
        if (local) {
            return { declName, info: local };
        }
        return;
    }

    // Handle Object.freeze calls
    if (
        init &&
        init.type === "CallExpression" &&
        isObjectMethodCall(init, "freeze")
    ) {
        const args = (init as CallExpression).arguments;
        if (args.length > 0) {
            return analyzeDeclaration({
                id,
                init: args[0],
                dCollection,
                declarations,
            });
        }
    }

    // Handle Object.defineProperty calls
    if (
        init &&
        init.type === "CallExpression" &&
        isObjectMethodCall(init, "defineProperty")
    ) {
        const args = (init as CallExpression).arguments;
        if (args.length > 0) {
            return analyzeDeclaration({
                id,
                init: args[0],
                dCollection,
                declarations,
            });
        }
    }

    // Handle Object expressions
    if (init && init.type === "ObjectExpression") {
        const entries: [string, Declaration][] = [];
        for (const prop of (init as ObjectExpression).properties) {
            if (prop.type === "Property") {
                const key = getPropertyName(prop.key);
                if (!key) continue;

                const value = prop.value;
                const result = analyzeDeclaration({
                    id: { type: "Identifier", name: key } as Identifier,
                    init: value,
                    dCollection,
                    declarations,
                });

                if (result) {
                    entries.push([result.declName, result.info]);
                }
            }
        }

        if (entries.length > 0) {
            return {
                declName,
                info: { children: Object.fromEntries(entries) },
            };
        }
    }

    return;
}

/**
 * Determines if a CallExpression is a call to a specific Object method.
 * @param expr - The CallExpression node.
 * @param methodName - The name of the method to check for (e.g., 'freeze').
 * @returns True if the expression is a call to Object.methodName, otherwise false.
 */
function isObjectMethodCall(expr: CallExpression, methodName: string): boolean {
    return (
        expr.callee.type === "MemberExpression" &&
        expr.callee.object.type === "Identifier" &&
        expr.callee.object.name === "Object" &&
        expr.callee.property.type === "Identifier" &&
        expr.callee.property.name === methodName
    );
}

/**
 * Retrieves the name of a property key, handling different key types.
 * @param key - The key node of a property.
 * @returns The property name as a string, or undefined if it cannot be determined.
 */
function getPropertyName(key: Property["key"]): string | undefined {
    if (key.type === "Identifier") {
        return key.name;
    }
    if (key.type === "Literal" && typeof key.value === "string") {
        return key.value;
    }
    return;
}



```

## src\exports\index.ts

```typescript
export * from './getDTS';
export * from './getExports';
export type * from "./types";

```

## src\exports\types.ts

```typescript
export type DInfo = {
    d: string;
    filePath: string;
}

export type DCollection = Record<string, DInfo>;

export type Declarations = Record<string, Declaration>;

export type WithChildrenDeclarations = {
    children: Declarations;
}

export type Declaration = DInfo | WithChildrenDeclarations;

```

## src\getSvgFileNames.ts

```typescript
import { readdirSync } from "fs";
import path from "path";

export function getSvgFileNames(dir: string): string[] {
    const entries = readdirSync(dir, { withFileTypes: true, recursive: true });
    return entries
        .filter((entry) => /\.(svg)$/i.test(entry.name) && !entry.isDirectory())
        .map(({ name, parentPath }) => path.join(parentPath, name))
}

```

## src\index.ts

```typescript
import { getDTS, getExports } from './exports';
import { getSvgoConfig, getSvg } from "@svgd/core";
import { getPng } from "./png";
import { getSvgFileNames } from "./getSvgFileNames";
import { generateFileName, generateConstantName, NameFormats } from "./nameFormat";

import type { NameFormat } from "./nameFormat";
import type { DCollection, DInfo, Declaration, Declarations, WithChildrenDeclarations } from "./exports";

export {
    getSvg,
    getPng,
    getExports,
    getDTS,
    getSvgoConfig,
    getSvgFileNames,
    generateFileName,
    generateConstantName,
    NameFormats,
}

export type {
    NameFormat,
    DCollection,
    DInfo,
    Declaration,
    Declarations,
    WithChildrenDeclarations
};

```

## src\nameFormat.ts

```typescript
import path from 'path';

export const NameFormats = {
    camelCase: 'camelCase',
    PascalCase: 'PascalCase',
    snake_case: 'snake_case',
    SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
} as const;

export type NameFormat = typeof NameFormats[keyof typeof NameFormats];

/**
 * Converts a string to PascalCase.
 */
function toPascalCase(str: string): string {
    // Example: "my-icon_name" -> "MyIconName"
    return str.replace(/(^|[-_ ])+./g, (match) =>
        match.charAt(match.length - 1).toUpperCase()
    ).replace(/[-_ ]/g, "");
}

/**
 * Converts a string to camelCase.
 */
function toCamelCase(str: string): string {
    // Example: "MyIconName" -> "myIconName"
    return toPascalCase(str).replace(/^[A-Z]/, (match) => match.toLowerCase());
}

/**
 * Applies a range template like {0}, {1,-1}, etc. to an array of strings.
 */
function formatWithTemplateAndRange(
    array: string[],
    template: string,
    separator = '_'
): string {
    if (!template) {
        return array.join(separator);
    }
    return template
        .replace(/{(-?\d+),(-?\d+)}/g, (_match, startStr, endStr) => {
            const startIndex = parseInt(startStr, 10);
            const endIndex = parseInt(endStr, 10);
            const elements = array.slice(
                startIndex,
                endIndex === -1 ? undefined : endIndex + 1
            );
            return `${separator}${elements.join(separator)}${separator}`;
        })
        .replace(/{(-?\d+)}/g, (_match, indexStr) => {
            let idx = parseInt(indexStr, 10);
            if (idx < 0) {
                idx = array.length + idx;
            }
            return array[idx] !== undefined ? `${separator}${array[idx]}${separator}` : separator;
        })
        .replace(new RegExp(`[${separator}]+`, 'g'), separator)
        .replace(new RegExp(`^[${separator}]|[${separator}]$`, 'g'), "");
}

/**
 * Builds the constant name from the SVG path, based on a template and a format.
 */
export function generateConstantName(
    filePath: string,
    baseDir: string,
    template: string,
    format: NameFormat
): string {
    const relativePath = path.relative(baseDir, filePath);
    const nameWithoutExt = relativePath.slice(
        0,
        -path.extname(relativePath).length
    );

    const splitted = nameWithoutExt.split(path.sep);
    const formatted = formatWithTemplateAndRange(splitted, template);

    switch (format) {
        case NameFormats.camelCase:
            return toCamelCase(formatted);
        case NameFormats.PascalCase:
            return toPascalCase(formatted);
        case NameFormats.snake_case:
            return formatted.replace(/[-\s]+/g, '_').toLowerCase();
        case NameFormats.SCREAMING_SNAKE_CASE:
            return formatted.replace(/[-\s]+/g, '_').toUpperCase();
        default:
            return formatted;
    }
}

/**
 * Builds the final output file name, based on a template and directory structure.
 */
export function generateFileName(filePath: string, baseDir: string, template: string) {
    const relativePath = path.relative(baseDir, filePath);
    const nameWithoutExt = relativePath.slice(
        0,
        -path.extname(relativePath).length
    );

    const splitted = nameWithoutExt.split(path.sep);
    return formatWithTemplateAndRange(splitted, template, '/');
}

```

## src\png\getPng.ts

```typescript
import sharp from "sharp";

export const getPng = async (svgContent: string, width = 64, height = width) => {
    const pngBuffer = await sharp(Buffer.from(svgContent))
        .resize(width, height)
        .png()
        .toBuffer();
    return pngBuffer.toString('base64');
}

```

## src\png\index.ts

```typescript
export * from './getPng';

```

