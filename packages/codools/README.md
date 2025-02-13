# Codools - Code Tools

## Introduction

**Codools** is a utility library designed to:
- **Document Code:** Automatically generate detailed Markdown documentation of your project's source files, configuration files (such as `tsconfig.json` and `package.json`), and API use cases. This documentation can then be provided to ChatGPT to help it fully understand the project's structure and logic.
- **Simplify Testing:** Facilitate testing by providing helper functions for defining and executing test scenarios (or "stories") using [vitest](https://vitest.dev/). This allows you to easily mock data and verify outputs, making your tests more maintainable and easier to understand.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Generating Code Documentation](#generating-code-documentation)
    - [Generating API Documentation](#generating-api-documentation)
    - [Using in Tests](#using-in-tests)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install **Codools** via npm or yarn:

```bash
# Using npm
npm install codools

# Using yarn
yarn add codools
```

## Usage

### Generating Code Documentation

The following example demonstrates how to generate a Markdown file that documents your project's source code. This includes the contents of configuration files and all source files with allowed extensions (e.g., `.ts`, `.js`).

```typescript
// scripts/codeDoc.ts
import { getCodeMD, getESMPath, saveMD } from "codools";

saveMD("code.md", getCodeMD(getESMPath(import.meta.url, "..")));
```

### Generating API Documentation

This example shows how to generate API documentation based on your defined test stories (use cases). It gathers the test scenarios for various API functions and creates a Markdown file that includes the source code (with transformed imports) and the expected output for each case.

```typescript
// scripts/useCasesDoc.ts
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

### Using in Tests

You can integrate **Codools** into your testing suite to automatically describe and run your test stories. The following example demonstrates how to use the library with [vitest](https://vitest.dev/) for testing your API functions.

```typescript
// tests/stories/stories.test.ts
import { describe } from "vitest";
import { stories as getPaths } from "tests/stories/getPaths/stories";
import { stories as getSvg } from "tests/stories/getSvg/stories";
import { stories as getSvgoConfig } from "tests/stories/getSvgoConfig/stories";
import { describeStories } from "codools/tests";

describe("getSvgoConfig", () => describeStories(getSvgoConfig));
describe("getPaths", () => describeStories(getPaths));
describe("getSvg", () => describeStories(getSvg));
```

## API Reference

The library exports several key functions and types:

- **`useStory`**  
  A helper function to generate test stories from mocks. It allows you to define input and output data for your test cases.

- **`transformImports`**  
  Transforms the source code by replacing specific imports (e.g., `./data`) with inline variable declarations based on provided mock values.

- **`getApiMD`**  
  Generates API documentation in Markdown format from an array of test stories (use cases), including the source code (with transformed imports) and expected outputs.

- **`getCodeMD`**  
  Scans the project directory (using `tsconfig.json`) and generates Markdown documentation that includes configuration files and all relevant source files.

- **`getESMPath`**  
  Utility function to resolve the directory in an ES Module context.

- **`saveMD`**  
  Saves the generated Markdown content to a file (by default, inside a `docs` directory).

## Testing

**Codools** integrates with [vitest](https://vitest.dev/) to support testing scenarios through the use of "stories". The sample test file provided in the usage section demonstrates how to describe and run test cases automatically. By dynamically mocking data and transforming code, you can validate both successful and error cases in your API functions.

## Contributing

Contributions are welcome! If you'd like to improve the library, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure all tests pass.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** The primary goals of **Codools** are to:
1. **Document Code:** Provide comprehensive documentation to feed information to ChatGPT, helping it fully understand your codebase and project.
2. **Simplify Testing:** Offer tools to streamline testing by integrating documentation generation and test scenario management.
````markdown
