# @svgd/core

**@svgd/core** is a core library that converts SVGs into an extended, optimized path data string (a compact representation ideal for bundling) and vice versa – converting extended path data back into full SVG for rendering. This module is primarily used for working with icons and serves as the foundation for both [@svgd/cli](https://npmjs.com/package/@svgd/cli) and [@svgd/vite-plugin](https://npmjs.com/package/@svgd/vite-plugin).

## Features

- **SVG to Extended Path Data Conversion:**  
  Optimize and convert an SVG file into a compact path data string that embeds additional style information. This is ideal for storing icons in bundles.

- **Extended Path Data to SVG Rendering:**  
  Reconstruct a full SVG from the extended path data string for rendering in browsers or other environments.

- **Extended Commands:**  
  In addition to standard SVG path commands, the module supports extra commands that encode additional attributes such as fill, stroke, opacity, etc., directly into the path data.

- **SVGO Integration:**  
  Provides a preconfigured SVGO setup with custom plugins to:
    - Extract and merge additional commands from SVG paths.
    - Resize SVGs by wrapping content in a `<g>` element with appropriate transforms.

## Installation

Install via npm:

```bash
npm install @svgd/core
```

Or with yarn:

```bash
yarn add @svgd/core
```

## API Overview

### getSvgoConfig

This function returns an SVGO configuration that includes:
- A custom **resizePlugin** to adjust the SVG dimensions.
- An **extractPathDPlugin** to extract and merge extended commands into a single path data string.

```typescript
import { optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

const svgInput = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 10L20 20" opacity="0.5" fill="#ff0000" stroke="#00ff00" stroke-width="2"/>
</svg>`;

// Get the configured SVGO settings.
const svgoConfig = getSvgoConfig();

// Optimize the SVG to generate the extended path data.
const result = optimize(svgInput, svgoConfig);
console.log(result.data); // Outputs the extended path data: o0.5 Fff0000 f00ff00 w2 M10 10L20 20
```

### getSvg

Converts an extended path data string back into a full SVG string for rendering. You can also specify a custom `viewBox`.

```typescript
import { getSvg } from '@svgd/core';

const extendedPathData = "o0.5 Fff0000 f00ff00 w2 M10 10L20 20";

// Generate an SVG string from the extended path data.
const svgString = getSvg(extendedPathData, { minX: 0, minY: 0, width: 24, height: 24 });
console.log(svgString);
```

### getPaths

Parses an extended path data string and returns an array of objects representing each SVG path with its additional attributes. This is useful if you need to inspect or manipulate the individual commands.

```typescript
import { getPaths } from '@svgd/core';

const extendedPathData = "o0.5 Fff0000 f00ff00 w2 M10 10L20 20";

// Parse the extended path data into structured objects.
const paths = getPaths(extendedPathData);
console.log(paths);
/*
Outputs:
[
  {
    d: "M10 10L20 20",
    opacity: "0.5",
    fill: "#ff0000",
    stroke: "#00ff00",
    "stroke-width": "2"
  }
]
*/
```

## Extended Path Data Commands

The extended path data string not only contains the drawing instructions (the standard `d` attribute) but also additional commands to encode style attributes. The following extra commands are supported:

- **`o`** – `opacity`:  
  Sets the opacity of the path.  
  _Example:_ `o0.5` sets the opacity to 0.5.

- **`O`** – `fill-opacity`:  
  Sets the fill opacity of the path.  
  _Example:_ `O0.8` sets the fill opacity to 0.8.

- **`f`** – `stroke`:  
  Sets the stroke color. The color value is provided as a hex string without the `#` prefix and is converted during processing.  
  _Example:_ `f00ff00` sets the stroke to `#00ff00`.

- **`F`** – `fill`:  
  Sets the fill color. Like `f`, the color value is provided as a hex string without the `#` prefix.  
  _Example:_ `Fff0000` sets the fill to `#ff0000`.

- **`w`** – `stroke-width`:  
  Sets the stroke width of the path.  
  _Example:_ `w2` sets the stroke width to 2.

## Usage Scenario

The typical workflow with **@svgd/core** is:

1. **Optimization:**  
   Convert an SVG file into an extended path data string using SVGO with the provided configuration. This string is compact and optimal for storing in a bundle.

2. **Rendering:**  
   When rendering is required, convert the extended path data string back into a full SVG using `getSvg`.

This approach is particularly effective for icon libraries, where storage size and performance are critical.

## Additional Modules

This core module is used as the foundation for additional packages:
- **[@svgd/cli](https://npmjs.com/package/@svgd/cli):** A CLI tool for batch converting SVG icons.
- **[@svgd/vite-plugin](https://npmjs.com/package/@svgd/vite-plugin):** A Vite plugin for automatically generating icon constants from SVG files.

## License

This project is licensed under the [MIT License](LICENSE).
   ьб3 
