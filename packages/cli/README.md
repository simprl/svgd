# @svgd/cli

[![](https://img.shields.io/npm/v/@svgd/cli?style=flat)](https://www.npmjs.com/package/@svgd/cli)

A command-line tool for generating constants from SVG assets. It parses SVG files to extract path data and more, then produces exportable constants in JavaScript, TypeScript, Markdown, and HTML formats. Use it via the CLI or programmatically in your projects.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [CLI Usage](#cli-usage)
  - [Additional CLI Examples](#additional-cli-examples)
  - [Programmatic Usage](#programmatic-usage)
- [API Reference](#api-reference)
  - [generateSvgConstants](#generatesvgconstants)
  - [parseCliArgs](#parsecliargs)
- [Use Cases](#use-cases)
  - [Generating Files](#generating-files)
  - [Parsing CLI Arguments](#parsing-cli-arguments)
- [License](#license)
- [Contributing](#contributing)

---

## Installation

Install via npm:

```bash
npm install @svgd/cli
```

---

## Usage

### CLI Usage

After installation, the `svgd` command will be available. Use it to generate constant files directly from a folder of SVG icons.

#### Command-Line Options

- **`-i, --input <directory>`**  
  Input directory containing SVG files (default: `src/assets/icons`).

- **`-o, --output <file>`**  
  Output file path or pattern (default: `src/components/Icon/paths.js`).

- **`-q, --quote`**  
  Use single quotes in the output (default: `false`).

- **`-t, --template <string>`**  
  Template string for naming convention (default: an empty string).

- **`-f, --format <format>`**
  Naming format. Options: `camelCase`, `PascalCase`, `snake_case`, `SCREAMING_SNAKE_CASE`, `material` (default: `camelCase`).

- **`-m, --md <string>`**  
  Path to the output Markdown file (default: empty).

- **`-h, --html <string>`**  
  Path to the output HTML file (default: empty).

- **`-d, --dts`**  
  Generate TypeScript declaration files (default: `false`).

#### Example CLI Command

```bash
svgd --input ./icons --output ./src/iconPaths.js --quote --template "ICON_" --format snake_case --md ./icons.md --html ./icons.html --dts
```

---

### Additional CLI Examples

Below are additional examples showcasing different CLI usage scenarios:

- **Default Usage (with default options):**

  Simply run the command without any options to process SVG files from the default input directory.

  ```bash
  svgd
  ```

- **Custom Input and Output:**

  Generate a JavaScript constants file from a custom icons directory.

  ```bash
  svgd --input ./my-icons --output ./dist/icons.js
  ```

- **Generate with Custom Naming Format and Markdown Output:**

  Use snake_case for constant names and also produce a Markdown file listing all icons.

  ```bash
  svgd --input ./icons --output ./src/iconPaths.js --format snake_case --md ./icons.md
  ```

- **Use Single Quotes and Generate TypeScript Declarations:**

  Produce output with single quotes and also generate a corresponding TypeScript declaration file.

  ```bash
  svgd --input ./assets/svg --output ./icons.js --quote --dts
  ```

- **Generate HTML Output Along with JavaScript Constants:**

  Create both a JS constants file and an HTML file for visual inspection of the icons.

  ```bash
  svgd --input ./icons --output ./dist/icons.js --html ./dist/icons.html
  ```

---

### Programmatic Usage

You can also import and use the library in your Node.js projects.

#### Generating SVG Constants

```ts
import { generateSvgConstants } from "@svgd/cli";

const cliOptions = {
  input: "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons"
};

const [file1, file2, file3, file4] = await generateSvgConstants(cliOptions);
console.log(file1);
```

#### Parsing CLI Arguments

```ts
import { parseCliArgs } from "@svgd/cli";

const args = process.argv;
const options = parseCliArgs(args);
console.log(options);
```

---

## API Reference

### `generateSvgConstants(options: CLIOptions): Promise<GeneratedFile[]>`

Generates constants files from SVG files found in the specified input directory.

- **Parameters:**
  - `options` (CLIOptions): An object containing configuration such as input directory, output file path, quote style, naming template, and output formats.

- **Returns:**  
  A promise that resolves to an array of `GeneratedFile` objects, each having:
  - `path`: the output file path
  - `content`: the generated file content

### `parseCliArgs(argv: string[]): CLIOptions`

Parses the command-line arguments using [commander](https://www.npmjs.com/package/commander).

- **Parameters:**
  - `argv` (string[]): The array of command-line arguments.

- **Returns:**  
  A `CLIOptions` object with the following structure:

  ```json
  {
    "input": "src/assets/icons",
    "output": "src/components/Icon/paths.js",
    "quote": false,
    "template": "",
    "format": "camelCase",
    "md": "",
    "html": "",
    "dts": false
  }
  ```

Other exported functions include `runCLI(argv: string[]): Promise<void>`, which serves as the main entry point for the CLI tool.

---

## Use Cases

### Generating Files

#### Use Case 1: Without Options

```ts
import { generateSvgConstants } from "@svgd/cli";
const cliOptions = {
  input: "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons"
};
const [file1, file2, file3, file4] = await generateSvgConstants(cliOptions);
export { file1, file2, file3, file4 };
```

**Result:**  
An array of generated files (e.g., a JavaScript constants file) is produced from the SVG files in the specified directory.

#### Use Case 2: With Options

```ts
import { generateSvgConstants } from "@svgd/cli";
const cliOptions = {
  input: "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons",
  output: "icons.ts",
  quote: true,
  template: "",
  format: "SCREAMING_SNAKE_CASE",
  md: "icons.md",
  html: "icons.html",
  dts: true
};
const [file1, file2, file3, file4] = await generateSvgConstants(cliOptions);
export { file1, file2, file3, file4 };
```

**Result:**  
Generates multiple files including:
- A TypeScript file (`icons.ts`) containing the constants.
- A Markdown file (`icons.md`) listing the icons.
- An HTML file (`icons.html`) for visual inspection.
- A TypeScript declaration file (`icons.d.ts`).

---

### Parsing CLI Arguments

#### Use Case 1: No Arguments

```ts
import { parseCliArgs } from "@svgd/cli";
const args = [];
export const options = parseCliArgs(args);
```

**Result:**

```json
{
  "options": {
    "dts": false,
    "format": "camelCase",
    "html": "",
    "input": "src/assets/icons",
    "md": "",
    "output": "src/components/Icon/paths.js",
    "quote": false,
    "template": ""
  }
}
```

#### Use Case 2: With Arguments

```ts
import { parseCliArgs } from "@svgd/cli";
const args = [
  "node", "script",
  "--input", "icons",
  "--output", "out.js",
  "--quote",
  "--template", "ICON_",
  "--format", "snake_case",
  "--md", "readme.md",
  "--html", "index.html",
  "--dts", "true"
];
export const options = parseCliArgs(args);
```

**Result:**

```json
{
  "options": {
    "input": "icons",
    "output": "out.js",
    "quote": true,
    "template": "ICON_",
    "format": "snake_case",
    "md": "readme.md",
    "html": "index.html",
    "dts": true
  }
}
```

---

## License

MIT License

---

## Contributing

Contributions are welcome! Please submit issues or pull requests for bug fixes, enhancements, or additional features.

---
