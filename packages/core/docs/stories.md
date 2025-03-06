## Get config for svgo for convert svg to d attribute of tag path

### Use Case 1. Material UI icon with size 20

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 20 20\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\"><g><rect fill=\"none\" height=\"20\" width=\"20\"/><path d=\"M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z\"/></g></svg>";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
}
```

### Use Case 2. Material UI icon with size 24

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 3. Transparent Material UI icon

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M12,16l-4-4h3l0-4h2l0,4h3L12,16z\" opacity=\".3\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 4. Additional attributes

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg id=\"a\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <defs><style>.b{fill:#00ff00;}</style></defs>\r\n    <circle class=\"b\" cx=\"50\" cy=\"50\" r=\"40\" opacity=\"0.8\"/>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" opacity=\"0.6\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 5. Empty svg

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": ""
}
```

### Use Case 6. Throw if incorrect svg

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "ss";
const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
`Throw Error`
---

## Convert pathD to array paths tags attributes

### Use Case 1. Material UI icon with size 20

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
    }
  ]
}
```

### Use Case 2. Material UI icon with size 24

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
    }
  ]
}
```

### Use Case 3. Transparent Material UI icon

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
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
}
```

### Use Case 4. Additional attributes

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
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
}
```

### Use Case 5. Empty svg

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": []
}
```

### Use Case 6. Throw if pathD is null

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = null;
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
`Throw Error`
---

## Get svg from pathD

### Use Case 1. Material UI icon with size 20

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path d=\"M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z\" />\n</svg>"
}
```

### Use Case 2. Material UI icon with size 24

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path d=\"M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z\" />\n</svg>"
}
```

### Use Case 3. Transparent Material UI icon

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".3\" d=\"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z\" />\n  <path opacity=\"1\" d=\"M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z\" />\n</svg>"
}
```

### Use Case 4. Additional attributes

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "o.8 F0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.6 F00f M2.4 2.4h7.2v7.2H2.4z ff0f w.48 M2.4 19.2h19.2 Fff0 m12 2.4 9.6 19.2H2.4z Ff90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".8\" fill=\"#0f0\" d=\"M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2\" />\n  <path opacity=\".6\" fill=\"#00f\" d=\"M2.4 2.4h7.2v7.2H2.4z\" />\n  <path stroke=\"#f0f\" stroke-width=\".48\" d=\"M2.4 19.2h19.2\" />\n  <path fill=\"#ff0\" d=\"m12 2.4 9.6 19.2H2.4z\" />\n  <path fill=\"#f90\" d=\"M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304\" />\n</svg>"
}
```

### Use Case 5. Empty svg

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"></svg>"
}
```

### Use Case 6. Throw if pathD is null

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = null;
export const svgOutput = getSvg(pathD);

```

#### Result:
`Throw Error`