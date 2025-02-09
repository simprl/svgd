# @svgd/core

**@svgd/core** is a core library for working with SVG icons. It converts SVG files into an extended, optimized path data string—an efficient and compact representation ideal for bundling—and converts this extended path data back into a full SVG for rendering. This module serves as the foundation for both [@svgd/cli](https://npmjs.com/package/@svgd/cli) and [@svgd/vite-plugin](https://npmjs.com/package/@svgd/vite-plugin).

---

## Introduction

@svgd/core provides a streamlined way to optimize SVG icons by converting them into a single, compact string that includes not only the path data (`d` attribute) but also additional styling attributes such as opacity, fill, stroke, and stroke-width. It also allows you to reverse this process, generating full SVG markup from the compact string.

Key integration points include:
- **SVGO Integration:** A preconfigured setup with custom plugins such as `resizePlugin` and `extractPathDPlugin` to handle resizing and extraction of extended path data.
- **Extended Commands:** Support for extra commands to encode additional attributes directly into the path data.

---

## Features

- **SVG to Extended Path Data Conversion:**  
  Optimize and convert SVG files into a compact string that embeds additional style information, ideal for efficient storage and bundling.

- **Extended Path Data to SVG Rendering:**  
  Reconstruct full SVG markup from the extended path data string for rendering in browsers or other environments.

- **Extended Commands Support:**  
  In addition to the standard SVG `d` attribute, the module supports extra commands for attributes like `opacity`, `fill-opacity`, `stroke`, `fill`, and `stroke-width`.

- **SVGO Integration:**  
  Comes with a preconfigured SVGO setup that includes custom plugins:
  - **resizePlugin:** Wraps SVG content in a `<g>` element with computed transformations to resize the icon.
  - **extractPathDPlugin:** Extracts and merges additional commands from SVG paths into a single extended path data string.

---

## Installation

You can install the library via npm:

```bash
npm install @svgd/core
```

Or with yarn:

```bash
yarn add @svgd/core
```

---

## Usage

### 1. Converting SVG to Extended Path Data using `getSvgoConfig`

This example shows how to optimize an SVG (a Material UI icon with size 24) and obtain its extended path data string using the preconfigured SVGO setup.

#### Code:
```typescript
import { optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

const svgInput = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
  <g>
    <rect fill="none" height="24" width="24"/>
    <path d="M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12
      c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z"/>
  </g>
</svg>`;

const svgoConfig = getSvgoConfig();
const result = optimize(svgInput, svgoConfig);
console.log(result.data);
```

#### Output:
```json
{
  "pathD": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

---

### 2. Parsing Extended Path Data using `getPaths`

This example demonstrates how to convert an extended path data string back into an array of objects, each representing a `<path>` with its attributes.

#### Code:
```typescript
import { getPaths } from '@svgd/core';

const pathD = "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z";
const attributes = getPaths(pathD);
console.log(JSON.stringify({ attributes }, null, 2));
```

#### Output:
```json
{
  "attributes": [
    {
      "d": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
    }
  ]
}
```

---

### 3. Reconstructing SVG from Extended Path Data using `getSvg`

This example shows how to reconstruct full SVG markup from an extended path data string (a Material UI icon with size 20).

#### Code:
```typescript
import { getSvg } from '@svgd/core';

const pathD = "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z";
const svgOutput = getSvg(pathD);
console.log(svgOutput);
```

#### Output:
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z" />
</svg>
```

---

### 4. Use Cases: Extended Commands

This example demonstrates a complete SVG optimization process that utilizes all supported extended commands. It includes commands for opacity, fill-opacity, stroke, fill, and stroke-width.

#### Code:
```typescript
import { optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

const svgInput = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#00ff00" opacity="0.8"/>
  <rect x="10" y="10" width="30" height="30" fill="#0000ff" opacity="0.6"/>
  <line x1="10" y1="80" x2="90" y2="80" stroke="#ff00ff" stroke-width="2"/>
  <polygon points="50,10 90,90 10,90" fill="#ffff00"/>
  <ellipse transform="scale(.24)" cx="50" cy="50" rx="30" ry="20" fill="#ff9900"/>
</svg>`;

const svgoConfig = getSvgoConfig();
const pathD = optimize(svgInput, svgoConfig).data;
console.log(pathD);
```

#### Output:
```json
{
  "pathD": "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

---

## Extended Path Data Commands

The extended path data string not only contains the drawing instructions (the standard `d` attribute) but also additional commands to encode style attributes. The following extra commands are supported:

- **`o`** – `opacity`:  
  Sets the opacity of the path.  
  _Example:_ `o0.5` (sets opacity to `0.5`)

- **`O`** – `fill-opacity`:  
  Sets the fill opacity of the path.  
  _Example:_ `O0.7` (sets fill-opacity to `0.7`)

- **`f`** – `stroke`:  
  Sets the stroke color. The color value is provided as a hex string without the `#` prefix and is converted during processing.  
  _Example:_ `fFF0000` (sets stroke color to `#FF0000`)

- **`F`** – `fill`:  
  Sets the fill color. Like `f`, the color value is provided as a hex string without the `#` prefix.  
  _Example:_ `F00FF00` (sets fill color to `#00FF00`)

- **`w`** – `stroke-width`:  
  Sets the stroke width of the path.  
  _Example:_ `w2` (sets stroke width to `2`)

---

## Usage Scenario

The typical workflow with **@svgd/core** is:

1. **Optimization:**  
   Convert an SVG file into an extended path data string using SVGO with the provided configuration. This string is compact and optimal for storing in a bundle.

2. **Rendering:**  
   When rendering is required, convert the extended path data string back into a full SVG using `getSvg`.

This approach is particularly effective for icon libraries, where storage size and performance are critical.

---

## API Reference

The public API of **@svgd/core** includes the following functions and objects:

- **getSvgoConfig(config?)**  
  Returns a preconfigured SVGO configuration that includes custom plugins for resizing SVGs and extracting extended path data.

- **getPaths(d: string)**  
  Converts an extended path data string into an array of objects, where each object represents a `<path>` with its attributes.

- **getSvg(d: string, viewbox?)**  
  Reconstructs full SVG markup from the extended path data string. An optional custom viewBox can be provided.

- **defaultConfig**  
  The default configuration object for the library, which includes settings for both resizing and SVGO.

For detailed use cases and further examples, please refer to [docs/api.md](docs/api.md).

---

## Additional Modules

This core module is used as the foundation for additional packages:
- **[@svgd/cli](https://npmjs.com/package/@svgd/cli):** A CLI tool for batch converting SVG icons.
- **[@svgd/vite-plugin](https://npmjs.com/package/@svgd/vite-plugin):** A Vite plugin for automatically generating icon constants from SVG files.

---

## Contributing

Contributions are welcome! If you’d like to contribute to **@svgd/core**, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and concise messages.
4. Open a pull request describing your changes and the motivation behind them.

For more detailed contribution guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

If you have any questions or need further assistance, please feel free to open an issue or reach out. Enjoy using **@svgd/core**!
