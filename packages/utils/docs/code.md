I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use Clean Code, Clean Architecture, SOLID, Atomic design
If something is unclear or needs clarification, feel free to ask me.
# Project "@svgd/utils"

## package.json

```json
{
  "name": "@svgd/utils",
  "version": "0.1.35",
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
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "test": "vitest run tests/stories/stories.test.ts",
    "docs": "tsx scripts/codeDoc && tsx scripts/useCasesDoc",
    "lint": "eslint"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "@svgd/mocks": "*",
    "@types/node": "^18.19.71",
    "codools": "^0.2.19",
    "tsup": "^8.3.5",
    "tsx": "^4.19.2",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^3.0.5"
  },
  "dependencies": {
    "@svgd/core": "^0.3.31",
    "sharp": "^0.33.5",
    "svgo": "^3.3.2",
    "typescript": "^5.7.3"
  }
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
      "@svgd/utils": ["src/index"]
    }
  },
  "include": ["src", "tests", "scripts"]
}

```

## src/getPng.ts

```typescript
import sharp from "sharp";

export const getPng = async (svgContent: string, width = 64, height = width) => {
    if (!svgContent) return "";
    const pngBuffer = await sharp(Buffer.from(svgContent))
        .resize(width, height)
        .png()
        .toBuffer();
    return pngBuffer.toString('base64');
}

```


## src/getSvgFileNames.ts

```typescript
import { readdirSync } from "fs";
import { resolve, join } from "path";

export function getSvgFileNames(dir: string): string[] {
    const entries = readdirSync(resolve(dir), { withFileTypes: true, recursive: true });
    return entries
        .filter((entry) => /\.(svg)$/i.test(entry.name) && !entry.isDirectory())
        .map(({ name, parentPath }) => join(parentPath, name))
        .sort()
}

```


## src/index.ts

```typescript
import { getSvgoConfig, getSvg, defaultConfig, type SVGDConfig } from "@svgd/core";
import { getPng } from "./getPng";
import { parseSvg } from "src/parseSvg";
import { getSvgFileNames } from "./getSvgFileNames";
import { generateFileName, generateConstantName, NameFormats } from "./nameFormat";

import type { NameFormat } from "./nameFormat";

export {
    getSvg,
    getPng,
    getSvgoConfig,
    getSvgFileNames,
    generateFileName,
    generateConstantName,
    NameFormats,
    parseSvg,
    defaultConfig
}

export type {
    NameFormat,
    SVGDConfig
};

```


## src/nameFormat.ts

```typescript
import path from 'path';

export const NameFormats = {
    camelCase: 'camelCase',
    PascalCase: 'PascalCase',
    snake_case: 'snake_case',
    SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
    material: 'material',
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

const singleDigitNumbers = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
];

const twoDigitNumbers1 = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
];

function toMaterialName(str: string): string {
    let fileName = str
        .replace(/_([0-9]+)px$/, '')
        .replace(/(^.)|(_)(.)/g, (_m, p1, _p2, p3) => (p1 || p3).toUpperCase());

    if (fileName.startsWith('3dRotation')) {
        return `ThreeD${fileName.slice(2)}`;
    }

    if (fileName.startsWith('3p')) {
        return `ThreeP${fileName.slice(2)}`;
    }

    if (fileName.startsWith('30fps')) {
        return `ThirtyFps${fileName.slice(5)}`;
    }
    if (fileName.startsWith('60fps')) {
        return `SixtyFps${fileName.slice(5)}`;
    }
    if (fileName.startsWith('360')) {
        return `ThreeSixty${fileName.slice(3)}`;
    }

    if (/\dFt/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}${fileName.slice(1)}`;
    }

    if (/\dk/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}K${fileName.slice(2)}`;
    }

    if (/^\dmp/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}M${fileName.slice(2)}`;
    }
    if (/^1\dmp/.test(fileName)) {
        return `${twoDigitNumbers1[Number(fileName[1])] ?? fileName[1]}M${fileName.slice(3)}`;
    }
    if (/^2\dmp/.test(fileName)) {
        return `Twenty${singleDigitNumbers[Number(fileName[1])] ?? fileName[1]}M${fileName.slice(3)}`;
    }

    if (fileName.startsWith('1x')) {
        return `TimesOne${fileName.slice(2)}`;
    }

    if (fileName.startsWith('3g')) {
        return `ThreeG${fileName.slice(2)}`;
    }
    if (fileName.startsWith('4g')) {
        return `FourG${fileName.slice(2)}`;
    }
    if (fileName.startsWith('5g')) {
        return `FiveG${fileName.slice(2)}`;
    }

    if (/^1\d/.test(fileName)) {
        return `${twoDigitNumbers1[Number(fileName[1])] ?? fileName[1]}${fileName.slice(2)}`;
    }

    return fileName;
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
        case NameFormats.material:
            return toMaterialName(formatted);
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


## src/parseSvg.ts

```typescript
import { type Config, optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

let defSVGOConfig: Config;

export const parseSvg = (svg: string, svgoConfig?: Config): string => {
    if (svgoConfig) {
        return optimize(svg, svgoConfig).data;
    }

    if (!defSVGOConfig) {
        defSVGOConfig = getSvgoConfig();
    }
    return optimize(svg, defSVGOConfig).data;
};

```

