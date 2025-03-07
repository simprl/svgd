## Get config for svgo for convert svg to d attribute of tag path

### Use Case 1. Empty svg

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": ""
}
```

### Use Case 2. Material UI icon with size 20

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 20 20\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\">\r\n    <g>\r\n        <rect fill=\"none\" height=\"20\" width=\"20\"/>\r\n        <path d=\"M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z\"/>\r\n    </g>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z"
}
```

### Use Case 3. Material UI icon with size 24

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 4. Transparent Material UI icon

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M12,16l-4-4h3l0-4h2l0,4h3L12,16z\" opacity=\".3\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "o.3 M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z o1 M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"
}
```

### Use Case 5. Additional attributes (remove colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg id=\"a\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <defs><style>.b{fill:#00ff00;}</style></defs>\r\n    <circle class=\"b\" cx=\"50\" cy=\"50\" r=\"40\" opacity=\"0.8\"/>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" stroke=\"#ff00ff\" opacity=\"0.8\" fill-opacity=\"0.5\" stroke-opacity=\"0.3\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "o.8 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 fc w.24 M2.4 2.4h7.2v7.2H2.4z fc w.48 M2.4 19.2h19.2 o1 m12 2.4 9.6 19.2H2.4z o1 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 6. Additional attributes (with colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg id=\"a\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <defs><style>.b{fill:#00ff00;}</style></defs>\r\n    <circle class=\"b\" cx=\"50\" cy=\"50\" r=\"40\" opacity=\"0.8\"/>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" stroke=\"#ff00ff\" opacity=\"0.8\" fill-opacity=\"0.5\" stroke-opacity=\"0.3\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "o.8 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 7. Fill None (remove colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 24 24\">\r\n    <path d=\"M12,20.5a8.5,8.5,0,0,1,0-17Z\" stroke-width=\"1\"/>\r\n    <circle cx=\"12\" cy=\"12\" r=\"8.7\" fill=\"none\" stroke=\"#000\" stroke-width=\"0.5\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 20.5a8.5 8.5 0 0 1 0-17Z fc Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z"
}
```

### Use Case 8. Fill None (with colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 24 24\">\r\n    <path d=\"M12,20.5a8.5,8.5,0,0,1,0-17Z\" stroke-width=\"1\"/>\r\n    <circle cx=\"12\" cy=\"12\" r=\"8.7\" fill=\"none\" stroke=\"#000\" stroke-width=\"0.5\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z"
}
```

### Use Case 9. Fill Rule Even Odd (remove colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <defs>\r\n        <style>.cls-1,.cls-2{fill:#f4f6f8;}.cls-2{fill-rule:evenodd;}</style>\r\n    </defs>\r\n    <path class=\"cls-1\" d=\"M2.75,10.3A.75.75,0,1,0,2,9.55.76.76,0,0,0,2.75,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M21.25,10.3a.75.75,0,1,0-.75-.75A.76.76,0,0,0,21.25,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M12,7.2A1.2,1.2,0,1,0,10.8,6,1.2,1.2,0,0,0,12,7.2Z\"/>\r\n    <path class=\"cls-2\"\r\n          d=\"M15.84,15.05,12,7,8.16,15.05,3,10.15a24.62,24.62,0,0,1,2.09,6.42A24.13,24.13,0,0,1,4.86,21H19.14a24.16,24.16,0,0,1-.23-4.34A24.75,24.75,0,0,1,21,10.15Zm-4,2.86a.65.65,0,0,0-.64-.59.82.82,0,0,0-.68.39.84.84,0,0,0-.68-.39.65.65,0,0,0-.64.59.9.9,0,0,0,.25.63l.25.26h0a4,4,0,0,1,.82,1,4,4,0,0,1,.82-1h0l.25-.26A1,1,0,0,0,11.84,17.91Zm2.27.46a.8.8,0,0,1,.26-.05.59.59,0,1,1,0,1.17.69.69,0,0,1-.57-.29,1.18,1.18,0,0,0,.29.76h-.74a1.18,1.18,0,0,0,.29-.76.69.69,0,0,1-.57.29.59.59,0,1,1,0-1.17.8.8,0,0,1,.26.05.57.57,0,0,1-.28-.47.68.68,0,0,1,1.34,0A.57.57,0,0,1,14.11,18.37ZM16.8,17a6.39,6.39,0,0,1-1.2,1.5A6.24,6.24,0,0,1,16.8,20,6,6,0,0,1,18,18.5,6.14,6.14,0,0,1,16.8,17ZM8,17.94a2.44,2.44,0,0,1,.24.25.87.87,0,0,1,.24.61.62.62,0,0,1-.62.56.77.77,0,0,1-.56-.27,1.31,1.31,0,0,0,.32.73h-.8a1.31,1.31,0,0,0,.32-.73.77.77,0,0,1-.57.27A.62.62,0,0,1,6,18.8a.87.87,0,0,1,.24-.61,2.44,2.44,0,0,1,.24-.25A3.83,3.83,0,0,0,7.26,17,3.83,3.83,0,0,0,8,17.94Z\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94"
}
```

### Use Case 10. Fill Rule Even Odd (with colors)

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\r\n    <defs>\r\n        <style>.cls-1,.cls-2{fill:#f4f6f8;}.cls-2{fill-rule:evenodd;}</style>\r\n    </defs>\r\n    <path class=\"cls-1\" d=\"M2.75,10.3A.75.75,0,1,0,2,9.55.76.76,0,0,0,2.75,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M21.25,10.3a.75.75,0,1,0-.75-.75A.76.76,0,0,0,21.25,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M12,7.2A1.2,1.2,0,1,0,10.8,6,1.2,1.2,0,0,0,12,7.2Z\"/>\r\n    <path class=\"cls-2\"\r\n          d=\"M15.84,15.05,12,7,8.16,15.05,3,10.15a24.62,24.62,0,0,1,2.09,6.42A24.13,24.13,0,0,1,4.86,21H19.14a24.16,24.16,0,0,1-.23-4.34A24.75,24.75,0,0,1,21,10.15Zm-4,2.86a.65.65,0,0,0-.64-.59.82.82,0,0,0-.68.39.84.84,0,0,0-.68-.39.65.65,0,0,0-.64.59.9.9,0,0,0,.25.63l.25.26h0a4,4,0,0,1,.82,1,4,4,0,0,1,.82-1h0l.25-.26A1,1,0,0,0,11.84,17.91Zm2.27.46a.8.8,0,0,1,.26-.05.59.59,0,1,1,0,1.17.69.69,0,0,1-.57-.29,1.18,1.18,0,0,0,.29.76h-.74a1.18,1.18,0,0,0,.29-.76.69.69,0,0,1-.57.29.59.59,0,1,1,0-1.17.8.8,0,0,1,.26.05.57.57,0,0,1-.28-.47.68.68,0,0,1,1.34,0A.57.57,0,0,1,14.11,18.37ZM16.8,17a6.39,6.39,0,0,1-1.2,1.5A6.24,6.24,0,0,1,16.8,20,6,6,0,0,1,18,18.5,6.14,6.14,0,0,1,16.8,17ZM8,17.94a2.44,2.44,0,0,1,.24.25.87.87,0,0,1,.24.61.62.62,0,0,1-.62.56.77.77,0,0,1-.56-.27,1.31,1.31,0,0,0,.32.73h-.8a1.31,1.31,0,0,0,.32-.73.77.77,0,0,1-.57.27A.62.62,0,0,1,6,18.8a.87.87,0,0,1,.24-.61,2.44,2.44,0,0,1,.24-.25A3.83,3.83,0,0,0,7.26,17,3.83,3.83,0,0,0,8,17.94Z\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
```json
{
  "pathD": "F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94"
}
```

### Use Case 11. Throw if incorrect svg

#### Code:
```ts
import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
const svgInput = "ss";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = optimize(svgInput, svgoConfig).data;

```

#### Result:
`Throw Error`
---

## Convert pathD to array paths tags attributes

### Use Case 1. Empty svg

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

### Use Case 2. Material UI icon with size 20

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

### Use Case 3. Material UI icon with size 24

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

### Use Case 4. Transparent Material UI icon

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

### Use Case 5. Additional attributes (remove colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "o.8 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 fc w.24 M2.4 2.4h7.2v7.2H2.4z fc w.48 M2.4 19.2h19.2 o1 m12 2.4 9.6 19.2H2.4z o1 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "opacity": ".8",
      "d": "M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2"
    },
    {
      "d": "M2.4 2.4h7.2v7.2H2.4z",
      "fill-opacity": ".5",
      "opacity": ".8",
      "stroke": "currentColor",
      "stroke-opacity": ".3",
      "stroke-width": ".24"
    },
    {
      "stroke": "currentColor",
      "stroke-width": ".48",
      "d": "M2.4 19.2h19.2"
    },
    {
      "d": "m12 2.4 9.6 19.2H2.4z",
      "opacity": "1"
    },
    {
      "d": "M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304",
      "opacity": "1"
    }
  ]
}
```

### Use Case 6. Additional attributes (with colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "o.8 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
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
      "d": "M2.4 2.4h7.2v7.2H2.4z",
      "fill": "#00f",
      "fill-opacity": ".5",
      "opacity": ".8",
      "stroke": "#f0f",
      "stroke-opacity": ".3",
      "stroke-width": ".24"
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

### Use Case 7. Fill None (remove colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "M12 20.5a8.5 8.5 0 0 1 0-17Z fc Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M12 20.5a8.5 8.5 0 0 1 0-17Z"
    },
    {
      "d": "M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
      "fill": "none",
      "stroke": "currentColor",
      "stroke-width": ".5"
    }
  ]
}
```

### Use Case 8. Fill None (with colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M12 20.5a8.5 8.5 0 0 1 0-17Z"
    },
    {
      "d": "M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z",
      "fill": "none",
      "stroke": "#000",
      "stroke-width": ".5"
    }
  ]
}
```

### Use Case 9. Fill Rule Even Odd (remove colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2"
    },
    {
      "d": "M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
      "fill-rule": "evenodd"
    }
  ]
}
```

### Use Case 10. Fill Rule Even Odd (with colors)

#### Code:
```ts
import { getPaths } from "@svgo/core";
const pathD = "F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94";
const attributes = getPaths(pathD);
export { attributes };

```

#### Result:
```json
{
  "attributes": [
    {
      "d": "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2",
      "fill": "#f4f6f8"
    },
    {
      "d": "M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94",
      "fill": "#f4f6f8",
      "fill-rule": "evenodd"
    }
  ]
}
```

### Use Case 11. Throw if pathD is null

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

### Use Case 1. Empty svg

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

### Use Case 2. Material UI icon with size 20

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

### Use Case 3. Material UI icon with size 24

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

### Use Case 4. Transparent Material UI icon

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

### Use Case 5. Additional attributes (remove colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "o.8 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 fc w.24 M2.4 2.4h7.2v7.2H2.4z fc w.48 M2.4 19.2h19.2 o1 m12 2.4 9.6 19.2H2.4z o1 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".8\" d=\"M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2\" />\n  <path opacity=\".8\" fill-opacity=\".5\" stroke-opacity=\".3\" stroke=\"currentColor\" stroke-width=\".24\" d=\"M2.4 2.4h7.2v7.2H2.4z\" />\n  <path stroke=\"currentColor\" stroke-width=\".48\" d=\"M2.4 19.2h19.2\" />\n  <path opacity=\"1\" d=\"m12 2.4 9.6 19.2H2.4z\" />\n  <path opacity=\"1\" d=\"M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304\" />\n</svg>"
}
```

### Use Case 6. Additional attributes (with colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "o.8 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".8\" fill=\"#0f0\" d=\"M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2\" />\n  <path opacity=\".8\" fill-opacity=\".5\" stroke-opacity=\".3\" stroke=\"#f0f\" fill=\"#00f\" stroke-width=\".24\" d=\"M2.4 2.4h7.2v7.2H2.4z\" />\n  <path stroke=\"#f0f\" stroke-width=\".48\" d=\"M2.4 19.2h19.2\" />\n  <path fill=\"#ff0\" d=\"m12 2.4 9.6 19.2H2.4z\" />\n  <path fill=\"#f90\" d=\"M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304\" />\n</svg>"
}
```

### Use Case 7. Fill None (remove colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "M12 20.5a8.5 8.5 0 0 1 0-17Z fc Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M12 20.5a8.5 8.5 0 0 1 0-17Z\" />\r\n  <path stroke=\"currentColor\" fill=\"none\" stroke-width=\".5\" d=\"M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z\" />\r\n</svg>"
}
```

### Use Case 8. Fill None (with colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "M12 20.5a8.5 8.5 0 0 1 0-17Z f#000 Fn w.5 M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M12 20.5a8.5 8.5 0 0 1 0-17Z\" />\r\n  <path stroke=\"#000\" fill=\"none\" stroke-width=\".5\" d=\"M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z\" />\r\n</svg>"
}
```

### Use Case 9. Fill Rule Even Odd (remove colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2\" />\r\n  <path fill-rule=\"evenodd\" d=\"M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94\" />\r\n</svg>"
}
```

### Use Case 10. Fill Rule Even Odd (with colors)

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = "F#f4f6f8 M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2 F#f4f6f8 e M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94";
export const svgOutput = getSvg(pathD);

```

#### Result:
```json
{
  "svgOutput": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path fill=\"#f4f6f8\" d=\"M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2\" />\r\n  <path fill=\"#f4f6f8\" fill-rule=\"evenodd\" d=\"M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94\" />\r\n</svg>"
}
```

### Use Case 11. Throw if pathD is null

#### Code:
```ts
import { getSvg } from "@svgo/core";
const pathD = null;
export const svgOutput = getSvg(pathD);

```

#### Result:
`Throw Error`