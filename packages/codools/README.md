
# Codools

> **Codools** (Code Tools) — a Swiss-army knife for documenting and testing your TypeScript/JavaScript projects.
> 
> Produces well-structured, contextual Markdown that’s ideal for feeding into AI tools (e.g., ChatGPT) so they can automatically grasp your codebase and its workflows.
---

## 🚀 Features

- **📄 Automatic Code Documentation**  
  - Scans your project using `tsconfig.json` paths.  
  - Embeds configuration files (`tsconfig.json`, `package.json`) in output.  
  - Inlines each source file (TS, JS, JSX, TSX, JSON, CSS, etc.) with syntax highlighting.  
  - Resolves local imports (including path aliases) and inlines imported code blocks.  
- **🧪 Story-Driven Testing Helpers**  
  - Define “stories” (use cases) in three simple files per feature:  
    1. **`data.ts`**: your mock input data (and type definitions).  
    2. **`story.ts`**: invocation of your library function, exporting result or throwing.  
    3. **`stories.ts`**: combines mocks + `useStory` to yield an array of test scenarios.  
  - **`useStory`** → generates strongly-typed test cases.  
  - **`transformImports`** → rewrites `import "./data"` into inline constants for headless testing.  
  - **`describeStories`** → Vitest harness that auto-runs every case, including both success and error paths.  
- **💾 CLI & Scripts**  
  - `codools` CLI to generate `.md` docs from your code.  
  - Integrates easily into npm scripts or standalone Node scripts.  
- **🤖 AI-Optimized Output:** Documentation is formatted and annotated for easy ingestion by AI assistants like ChatGPT.

---

## 📦 Installation

```bash
# npm
npm install codools

# yarn
yarn add codools

# pnpm
pnpm add codools
````

> **Note:** Requires Node.js ≥14 and an ESM‐compatible environment.

---

## 🛠️ Quickstart

### 1. Document Your Code

Create a small script—e.g. `scripts/codeDoc.ts`:

```ts
#!/usr/bin/env node
import { getCodeMD, getESMPath, saveMD } from "codools";

// Resolve project root (one level up from this script)
const projectRoot = getESMPath(import.meta, "..");

// Generate Markdown and write to docs/code.md
const markdown = getCodeMD(projectRoot);
saveMD("docs/code.md", markdown);
```

Add to `package.json` scripts:

```jsonc
{
  "scripts": {
    "docs": "tsx scripts/codeDoc.ts"
  }
}
```

Run:

```bash
npm run docs
```

---

### 2. Generate API (Use-Case) Docs

Define your test stories in `tests/stories/<feature>/…`:

```
tests/stories/getPaths/
├── data.ts      // export const pathD: string = "…";
├── story.ts     // import { getPaths } …; export const attributes = getPaths(pathD);
└── stories.ts   // useStory + mocks → export const stories
```

Then create `scripts/useCasesDoc.ts`:

```ts
#!/usr/bin/env node
import { getStoriesMD, getCodeMD, getESMPath, saveMD } from "codools";
import { stories as getPathsStories } from "../tests/stories/getPaths/stories";
import { stories as getSvgStories }      from "../tests/stories/getSvg/stories";
import { stories as getSvgoStories }     from "../tests/stories/getSvgoConfig/stories";

const root = getESMPath(import.meta, "..");

// 1. Code documentation
const codeMd = getCodeMD(root);

// 2. API use-case documentation
const apiMd = [
  getStoriesMD({ title: "getPaths",     stories: getPathsStories }),
  getStoriesMD({ title: "getSvg",       stories: getSvgStories }),
  getStoriesMD({ title: "getSvgoConfig", stories: getSvgoStories }),
].join("\n---\n\n");

// Save separate files
saveMD("docs/code.md", codeMd);
saveMD("docs/use-cases.md", apiMd);
```

Add to `package.json`:

```jsonc
{
  "scripts": {
    "docs:api": "tsx scripts/useCasesDoc.ts"
  }
}
```

Run:

```bash
npm run docs:api
```

---

### 3. Integrate With Vitest

Use the built-in test harness:

```ts
// tests/stories/stories.test.ts
import { describe } from "vitest";
import { describeStories } from "codools/tests";
import { stories as getPathsStories } from "./getPaths/stories";
import { stories as getSvgStories }   from "./getSvg/stories";
import { stories as getSvgoStories }  from "./getSvgoConfig/stories";

describe("getPaths",     () => describeStories(getPathsStories));
describe("getSvg",       () => describeStories(getSvgStories));
describe("getSvgoConfig",() => describeStories(getSvgoStories));
```

Run Vitest as usual:

```bash
npx vitest
```

---

## 🖥️ CLI Usage

Once you’ve installed **Codools**, you can use its CLI to generate Markdown docs without writing any script.

### Install Globally (optional)

```bash
# npm
npm install --global codools

# yarn
yarn global add codools

# pnpm
pnpm add --global codools
````

> If you prefer a local install, you can run via npx (npm ≥5.2) or pnpm:
>
> ```bash
> npx codools --root . --output docs/code.md
> ```

### Basic Command

```bash
codools [options]
```

### Options

| Flag                  | Description                                               | Default        |
| --------------------- | --------------------------------------------------------- | -------------- |
| `-r, --root <path>`   | Project root directory (where your `tsconfig.json` lives) | `.`            |
| `-o, --output <path>` | Output file path for the generated Markdown               | `docs/code.md` |
| `-h, --help`          | Show help information                                     | —              |
| `-V, --version`       | Show the installed **Codools** version                    | —              |

### Examples

* **Generate docs for the current project**

  ```bash
  codools
  ```

* **Specify a custom project root**

  ```bash
  codools --root packages/utils --output docs/utils-code.md
  ```

* **Use a custom output filename**

  ```bash
  codools -o README_CODE.md
  ```

* **View help**

  ```bash
  codools --help
  ```

## 🔍 API Reference

### `getCodeMD(rootDir: string, options?) → string`

* **rootDir**: Project root containing `tsconfig.json`.
* **options.ignorePatterns**: glob patterns to skip (default: `node_modules/**`, `dist/**`, etc.).
* **options.extensionToLang**: customize syntax highlighting map.
* **options.prompts**: override intro/common style prompts.

Returns a Markdown string documenting your entire codebase.

---

### `getStoriesMD({ title, stories }) → string`

* **title**: Section heading for this feature.
* **stories**: Array of `Story<Input,Output>` (from `useStory`).

Produces a Markdown section with each use case’s code and expected output.

---

### `useStory({ dir: string }) → { getStories(props) }`

* **dir**: `getESMPath(import.meta)` of your stories folder.
* **getStories({ mocks, input, output }) → Story\[]**

  * **mocks**: array of `{ title, isThrow?, …mockProps }`.
  * **input(mock) → Input**: maps mock → function args.
  * **output(mock) → Output**: maps mock → expected result.

Generates strongly-typed `Story<Input,Output>[]` ready for `describeStories` or `getStoriesMD`.

---

### `transformImports(filePath, code, mockValues) → string`

Rewrites any `import { x } from "./data"` in the source code into:

```ts
const x = /* literal from mockValues[x] */;
```

so that your stories can run in Vitest without touching the file system.

---

### `describeStories(stories) → void`

Vitest helper that loops through `stories` and:

1. **Mocks** `./data` via `vi.doMock`.
2. **Imports** your `story.ts` (with a query string cache-bust).
3. **Asserts** each exported key against `story.output`, or expects a throw.

---

### `getESMPath(importMeta, relativePath?) → string`

Helper to convert `import.meta.url` + `relativePath` into a file system path.

---

### `saveMD(filePath, content) → void`

* Creates parent directory if needed.
* Writes UTF-8 file.
* Logs success.

---

## 🧑‍💻 Contributing

We welcome all contributions!

1. **Fork** the repo
2. **Create** a feature branch (`git checkout -b feature/my-feature`)
3. **Commit** with clear, atomic messages
4. **Push** and open a Pull Request, referencing any relevant issues
5. Ensure **all tests** pass (`npm test` / `vitest`)

Check [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## 📜 Roadmap

* [ ] HTML-based output (beyond Markdown)
* [ ] Plugin system for custom file loaders
* [ ] Support for additional test frameworks (Jest, Mocha)
* [ ] VSCode extension for one-click docs generation

---

## 📄 License

Released under the [MIT License](LICENSE).

