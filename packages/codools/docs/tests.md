# Test Structure Description with Code Examples. You should always follow these instructions when I ask to create tests for the npm module.

This document describes a standardized test structure that can be used to generate tests for projects using codools. The structure separates test data, test execution, and test scenario definitions into individual files, making it easier to scale and maintain tests.

Below is the folder structure along with example code for each file. In this example, we use a feature called **getSvgoConfig** that demonstrates how to generate a "path d" string from an SVG file.

---

## Folder Structure

```
tests/
└── stories/
    ├── getSvgoConfig/
    │   ├── data.ts         // Input SVG data for testing getSvgoConfig
    │   ├── story.ts        // Executes getSvgoConfig with the input data and exports the generated path d
    │   └── stories.ts      // Defines test scenarios (stories) using codools' useStory
    ├── getPaths/
    │   ├── data.ts         // Input data for testing getPaths
    │   ├── story.ts        // Executes getPaths and exports its output
    │   └── stories.ts      // Defines test scenarios for getPaths
    ├── getSvg/
    │   ├── data.ts         // Input SVG string for testing getSvg
    │   ├── story.ts        // Executes getSvg and exports its output
    │   └── stories.ts      // Defines test scenarios for getSvg
    └── stories.test.ts     // Aggregates all test stories and runs them with Vitest
```

**story.ts** - it is actually a test and use case of a some npm library function. It should show how to use some functionality of the npm library
In generally **data.ts** use for provide example of input data for test in the store.ts
**stories.ts** combine test (file story.ts) with each mock data.

---

## File-by-File Description and Code Examples

### 1. `commonMocks.ts` (Moved to `@svgd/mocks`)

```typescript
import { join } from "path";
import { readFileSync } from "fs";
import { getESMPath } from "codools";

const inputDir = getESMPath(import.meta.url, './inputIcons');
const outputDir = getESMPath(import.meta.url, './outputIcons');

export interface PathAttributes {
  d: string;
  opacity?: string;
  "fill-opacity"?: string;
  stroke?: string;
  fill?: string;
  "stroke-width"?: string;
}

export interface Mock {
  title: string;
  svgFile?: string;
  svgInput?: string;
  svgOutput?: string;
  pathD: string;
  attributes: PathAttributes[];
  isThrow?: boolean;
}

export const mocks: Mock[] = [
  {
    title: "Material UI icon with size 20",
    svgFile: "icon1_20px.svg",
    pathD: "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z",
    attributes: [
      {
        "d": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
      }
    ]
  },
  {
    title: "Material UI icon with size 24",
    svgFile: "icon1_24px.svg",
    pathD: "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z",
    "attributes": [
      {
        "d": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
      }
    ]
  },
  {
    title: "Transparent Material UI icon",
    svgFile: "icon5_24px.svg",
    pathD: "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z",
    "attributes": [
      {
        "opacity": ".3",
        "d": "M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z"
      },
      {
        "opacity": "1",
        "d": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
      }
    ]
  },
  {
    title: "Additional attributes",
    svgFile: "test_icon.svg",
    pathD: "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
    "attributes": [
      {
        "opacity": ".8",
        "fill": "#0f0",
        "d": "M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2"
      },
      {
        "opacity": ".6",
        "fill": "#00f",
        "d": "M2.4 2.4h7.2v7.2H2.4z"
      },
      {
        "stroke": "#f0f",
        "stroke-width": ".48",
        "d": "M2.4 19.2h19.2"
      },
      {
        "fill": "#ff0",
        "d": "m12 2.4 9.6 19.2H2.4z"
      },
      {
        "fill": "#f90",
        "d": "M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
      }
    ]
  },
  {
    title: "Empty svg",
    svgInput: "",
    svgOutput: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"></svg>`,
    pathD: "",
    "attributes": []
  }
];

export const commonMocks = mocks.map((mock) => ({
  ...mock,
  svgInput: mock.svgInput ?? (mock.svgFile ? readFileSync(join(inputDir, mock.svgFile), 'utf-8').trim() : ""),
  svgOutput: mock.svgOutput ?? (mock.svgFile ? readFileSync(join(outputDir, mock.svgFile), 'utf-8').trim() : "")
}))
```

**Import the common mocks in your test scenarios as follows:**

```typescript
// Import common mocks from @svgd/mocks
import { commonMocks } from '@svgd/mocks';
```

---

### 2. `tests/stories/getSvgoConfig/data.ts`

This file contains the input data for testing the **getSvgoConfig** feature. It exports the SVG input content as a string.

```typescript
// tests/stories/getSvgoConfig/data.ts
// Example SVG input as a string. When test run this data will replace to maock data
export const svgInput: string = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M12 2L2 22h20L12 2z"/>
</svg>
`;
```

---

### 3. `tests/stories/getSvgoConfig/story.ts`

This file implements the test case for the **getSvgoConfig** function. It imports the function to be tested and the input data, executes the function, and exports the result (the generated path d string).

```typescript
// tests/stories/getSvgoConfig/story.ts
import { optimize } from "svgo";
import { getSvgoConfig } from "@svgo/core";
import { svgInput } from "./data"; // When test run this data will replace to maock data

// Retrieve the svgo configuration
const svgoConfig = getSvgoConfig();

// Optimize the SVG input and extract the generated path d string
export const pathD = optimize(svgInput, svgoConfig).data;
```

---

### 4. `tests/stories/getSvgoConfig/stories.ts`

This file combines the test case from `story.ts` with the mock data. It defines test scenarios (stories) for the **getSvgoConfig** feature using the `useStory` utility from codools. It also provides feature-specific overrides to the common mocks.

```typescript
// tests/stories/getSvgoConfig/stories.ts
import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from '@svgd/mocks';
import { useStory } from "codools";

// Initialize the story with the current module's URL for resolving the directory
const story = useStory<typeof input, typeof output>({ url: import.meta.url });

// Define mocks specific to getSvgoConfig tests, for example, a case where an incorrect SVG should throw an error
const mocks = [
  ...commonMocks,
  {
    title: "Throw if incorrect svg",
    isThrow: true,
    svgInput: "<svg></svg>", // Incorrect or insufficient SVG input
    pathD: "" // Expected path d is empty because of error
  }
];

// Generate stories using the mocks.
// The input function returns the data required by the test (in this case, svgInput),
// and the output function returns the expected result (here, pathD).
export const stories = story.getStories({
  mocks,
  input: ({ svgInput }) => ({ svgInput }),
  output: ({ pathD }) => ({ pathD })
});
```

---

### 5. `tests/stories/stories.test.ts`

This file aggregates all test scenarios from different feature directories (e.g., getSvgoConfig, getPaths, getSvg) and runs them using the Vitest framework. The `describeStories` utility from codools is used to execute each test story.

```typescript
// tests/stories/stories.test.ts
import { describe } from "vitest";
import { stories as getSvgoConfigStories } from "./getSvgoConfig/stories";
// Similarly, import stories for other features if needed:
// import { stories as getPathsStories } from "./getPaths/stories";
// import { stories as getSvgStories } from "./getSvg/stories";
import { describeStories } from "codools/tests";

// Run tests for getSvgoConfig
describe("getSvgoConfig", () => describeStories(getSvgoConfigStories));

// Uncomment and add similar blocks for additional features:
// describe("getPaths", () => describeStories(getPathsStories));
// describe("getSvg", () => describeStories(getSvgStories));
```

---

## Helper Utilities

The test scenarios are generated using two key utilities: **useStory** and **describeStories**.

### Source Code for `useStory`

```typescript
import { Story } from "src/types";
import { fileURLToPath } from "url";
import { dirname } from "path";

interface UseStoryProps {
  url: string;
}

interface DefMock {
  title?: string;
  isThrow?: boolean;
}

interface DescribeProps<Input extends Record<string, unknown>, Output extends Record<string, unknown>, Mock> {
  mocks: Mock[];
  input: (mock: Mock) => Input;
  output: (mock: Mock) => Output;
}

export interface UseStory<Input extends Record<string, unknown>, Output extends Record<string, unknown>> {
  getStories: <Mock extends DefMock>(props: DescribeProps<Input, Output, Mock>) => Story<Input, Output>[];
}

export const useStory = <
        Input extends Record<string, unknown>,
        Output extends Record<string, unknown>
>({ url }: UseStoryProps): UseStory<Input, Output> => {
  const __filename = fileURLToPath(url);
  const dir = dirname(__filename);
  return {
    getStories: ({ mocks, input, output }) => (
            mocks.map((mock, i) => mock?.isThrow ? ({
              isThrow: true,
              input: input(mock),
              output: undefined,
              title: mock?.title ?? String(i),
              dir
            }) : ({
              isThrow: false,
              input: input(mock),
              output: output(mock),
              title: mock?.title ?? String(i),
              dir
            }))
    ),
  };
}
```

---

### Source Code for `describeStories`

```typescript
import { test, expect, vi } from "vitest";
import { Story } from "src/types";

export const describeStories = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>(stories: Story<Input, Output>[]) => {
  stories.forEach((story, i) => {
    const title = ("title" in story) ? String(story.title) : `Test Case ${i}`;
    test(title, async () => {
      vi.doMock(`${story.dir}/data`, () => story.input);
      if (story.isThrow) {
        await expect(import(`${story.dir}/story`)).rejects.toThrow();
      } else {
        const output = await import(`${story.dir}/story?update=${Date.now()}`);

        Object.entries(story.output).forEach(([key, value]) => {
          expect(output[key]).toEqual(value);
        })
      }
    });
  });
};
```

---

## Summary

- **Separation of Concerns:**  
  Each file has a specific purpose:
    - `data.ts` – Provides the input data for the test.
    - `story.ts` – Executes the function under test and exports the result.
    - `stories.ts` – Assembles test scenarios by combining mock data with input and expected output.

- **Reusability of Mocks:**  
  Common mocks are stored in the `@svgd/mocks` module, allowing them to be reused across different test suites.

- **Automatic Test Generation:**  
  The `useStory` utility generates test scenarios based on provided mocks, while `describeStories` executes these scenarios using Vitest.

- **Scalability and Maintainability:**  
  This structure can easily be extended to support additional features (e.g., getPaths, getSvg) without duplicating code.

---
