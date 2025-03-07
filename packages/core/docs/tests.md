# Project "@svgd/core"

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
  "version": "0.3.10",
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
    "docs": "tsx scripts/codeDoc && tsx scripts/useCasesDoc",
    "lint": "eslint"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "@svgd/mocks": "*",
    "@types/node": "^18.19.71",
    "codools": "^0.2.1",
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

## tests\stories\getPaths\data.ts

```typescript
export const pathD: string = `M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z`;

```

## tests\stories\getPaths\stories.ts

```typescript
import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from '@svgd/mocks';
import { getESMPath, useStory } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [...commonMocks, {
    title: "Throw if pathD is null",
    isThrow: true,
    pathD: null as unknown as string,
    attributes: []
}]

export const stories = story.getStories({
    mocks,
    input: ({ pathD }) => ({ pathD }),
    output: ({ attributes }) => ({ attributes })
});

```

## tests\stories\getPaths\story.ts

```typescript
import { getPaths } from "@svgo/core";
import { pathD } from "./data";

const attributes = getPaths(pathD);

export { attributes };

```

## tests\stories\getSvg\data.ts

```typescript
export const pathD: string = "sdasd";

```

## tests\stories\getSvg\stories.ts

```typescript
import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from '@svgd/mocks';
import { getESMPath, useStory } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [...commonMocks, {
    title: "Throw if pathD is null",
    isThrow: true,
    pathD: null as unknown as string,
    svgOutput: ""
}]

export const stories = story.getStories({
    mocks,
    input: ({ pathD }) => ({ pathD }),
    output: ({ svgOutput }) => ({ svgOutput })
});

```

## tests\stories\getSvg\story.ts

```typescript
import { getSvg } from "@svgo/core";
import { pathD } from "./data";

export const svgOutput = getSvg(pathD);

```

## tests\stories\getSvgoConfig\data.ts

```typescript
import { SVGDConfig } from "@svgo/core";

export const config: Partial<SVGDConfig> | undefined = {
    colors: true
}

export const svgInput: string = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z" />
</svg>`;

```

## tests\stories\getSvgoConfig\stories.ts

```typescript
import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from '@svgd/mocks';
import { getESMPath, useStory } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [...commonMocks, {
    title: "Throw if incorrect svg",
    isThrow: true,
    svgInput: "ss",
    pathD: "",
    config: undefined
}]

export const stories = story.getStories({
    mocks,
    input: ({ svgInput, config }) => ({ svgInput, config }),
    output: ({ pathD }) => ({ pathD })
});

```

## tests\stories\getSvgoConfig\story.ts

```typescript
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
import { svgInput, config } from "./data";

const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });

export const pathD = optimize(svgInput, svgoConfig).data;

```

