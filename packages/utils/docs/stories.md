## Parse svg to path d

### Use Case 1. Empty svg

#### Code:
```ts
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 20 20\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\">\r\n    <g>\r\n        <rect fill=\"none\" height=\"20\" width=\"20\"/>\r\n        <path d=\"M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16 M10,17c3.87,0,7-3.13,7-7c0-3.87-3.13-7-7-7 c-3.87,0-7,3.13-7,7C3,13.87,6.13,17,10,17L10,17z M10.5,10V7h-1v3H7l3,3l3-3H10.5z\"/>\r\n    </g>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><g><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M12,16l-4-4h3l0-4h2l0,4h3L12,16z\" opacity=\".3\"/><path d=\"M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z\"/></g></svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg id=\"a\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <defs><style>.b{fill:#00ff00;}</style></defs>\r\n    <defs>\r\n        <filter filterUnits=\"objectBoundingBox\" height=\"102.3%\" id=\"ignoredDef\" width=\"102.3%\" x=\"-1.2%\" y=\"-1.2%\">\r\n            <feOffset dy=\"2\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\r\n            <feGaussianBlur in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\" stdDeviation=\"2\"></feGaussianBlur>\r\n            <feColorMatrix in=\"shadowBlurOuter1\" result=\"shadowMatrixOuter1\"\r\n                           values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0\"></feColorMatrix>\r\n            <feMerge>\r\n                <feMergeNode in=\"shadowMatrixOuter1\"></feMergeNode>\r\n                <feMergeNode in=\"SourceGraphic\"></feMergeNode>\r\n            </feMerge>\r\n        </filter>\r\n    </defs>\r\n    <g filter=\"url(#ignoredDef)\" opacity=\"0.8\">\r\n        <circle class=\"b\" cx=\"50\" cy=\"50\" r=\"40\" opacity=\"0.8\"/>\r\n    </g>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" stroke=\"#ff00ff\" opacity=\"0.8\" fill-opacity=\"0.5\" stroke-opacity=\"0.3\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

```

#### Result:
```json
{
  "pathD": "o.64 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 fc w.24 M2.4 2.4h7.2v7.2H2.4z fc w.48 M2.4 19.2h19.2 o1 m12 2.4 9.6 19.2H2.4z o1 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 6. Additional attributes (with colors)

#### Code:
```ts
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg id=\"a\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\r\n    <defs><style>.b{fill:#00ff00;}</style></defs>\r\n    <defs>\r\n        <filter filterUnits=\"objectBoundingBox\" height=\"102.3%\" id=\"ignoredDef\" width=\"102.3%\" x=\"-1.2%\" y=\"-1.2%\">\r\n            <feOffset dy=\"2\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\r\n            <feGaussianBlur in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\" stdDeviation=\"2\"></feGaussianBlur>\r\n            <feColorMatrix in=\"shadowBlurOuter1\" result=\"shadowMatrixOuter1\"\r\n                           values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0\"></feColorMatrix>\r\n            <feMerge>\r\n                <feMergeNode in=\"shadowMatrixOuter1\"></feMergeNode>\r\n                <feMergeNode in=\"SourceGraphic\"></feMergeNode>\r\n            </feMerge>\r\n        </filter>\r\n    </defs>\r\n    <g filter=\"url(#ignoredDef)\" opacity=\"0.8\">\r\n        <circle class=\"b\" cx=\"50\" cy=\"50\" r=\"40\" opacity=\"0.8\"/>\r\n    </g>\r\n    <rect x=\"10\" y=\"10\" width=\"30\" height=\"30\" fill=\"#0000ff\" stroke=\"#ff00ff\" opacity=\"0.8\" fill-opacity=\"0.5\" stroke-opacity=\"0.3\"/>\r\n    <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"80\" stroke=\"#ff00ff\" stroke-width=\"2\"/>\r\n    <polygon points=\"50,10 90,90 10,90\" fill=\"#ffff00\"/>\r\n    <ellipse transform=\"scale(.24)\" cx=\"50\" cy=\"50\" rx=\"30\" ry=\"20\" fill=\"#ff9900\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

```

#### Result:
```json
{
  "pathD": "o.64 F#0f0 M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2 o.8 of.5 os.3 f#f0f F#00f w.24 M2.4 2.4h7.2v7.2H2.4z f#f0f w.48 M2.4 19.2h19.2 F#ff0 m12 2.4 9.6 19.2H2.4z F#f90 M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304"
}
```

### Use Case 7. Fill None (remove colors)

#### Code:
```ts
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 24 24\">\r\n    <path d=\"M12,20.5a8.5,8.5,0,0,1,0-17Z\" stroke-width=\"1\"/>\r\n    <circle cx=\"12\" cy=\"12\" r=\"8.7\" fill=\"none\" stroke=\"#000\" stroke-width=\"0.5\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 24 24\">\r\n    <path d=\"M12,20.5a8.5,8.5,0,0,1,0-17Z\" stroke-width=\"1\"/>\r\n    <circle cx=\"12\" cy=\"12\" r=\"8.7\" fill=\"none\" stroke=\"#000\" stroke-width=\"0.5\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\r\n    <defs>\r\n        <style>.cls-1,.cls-2{fill:#f4f6f8;}.cls-2{fill-rule:evenodd;}</style>\r\n        <path id=\"a\" class=\"cls-1\" d=\"M2.75,10.3A.75.75,0,1,0,2,9.55.76.76,0,0,0,2.75,10.3Z\"/>\r\n    </defs>\r\n    <use xlink:href=\"#a\" overflow=\"visible\" ></use>\r\n    <path class=\"cls-1\" d=\"M21.25,10.3a.75.75,0,1,0-.75-.75A.76.76,0,0,0,21.25,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M12,7.2A1.2,1.2,0,1,0,10.8,6,1.2,1.2,0,0,0,12,7.2Z\"/>\r\n    <path class=\"cls-2\"\r\n          d=\"M15.84,15.05,12,7,8.16,15.05,3,10.15a24.62,24.62,0,0,1,2.09,6.42A24.13,24.13,0,0,1,4.86,21H19.14a24.16,24.16,0,0,1-.23-4.34A24.75,24.75,0,0,1,21,10.15Zm-4,2.86a.65.65,0,0,0-.64-.59.82.82,0,0,0-.68.39.84.84,0,0,0-.68-.39.65.65,0,0,0-.64.59.9.9,0,0,0,.25.63l.25.26h0a4,4,0,0,1,.82,1,4,4,0,0,1,.82-1h0l.25-.26A1,1,0,0,0,11.84,17.91Zm2.27.46a.8.8,0,0,1,.26-.05.59.59,0,1,1,0,1.17.69.69,0,0,1-.57-.29,1.18,1.18,0,0,0,.29.76h-.74a1.18,1.18,0,0,0,.29-.76.69.69,0,0,1-.57.29.59.59,0,1,1,0-1.17.8.8,0,0,1,.26.05.57.57,0,0,1-.28-.47.68.68,0,0,1,1.34,0A.57.57,0,0,1,14.11,18.37ZM16.8,17a6.39,6.39,0,0,1-1.2,1.5A6.24,6.24,0,0,1,16.8,20,6,6,0,0,1,18,18.5,6.14,6.14,0,0,1,16.8,17ZM8,17.94a2.44,2.44,0,0,1,.24.25.87.87,0,0,1,.24.61.62.62,0,0,1-.62.56.77.77,0,0,1-.56-.27,1.31,1.31,0,0,0,.32.73h-.8a1.31,1.31,0,0,0,.32-.73.77.77,0,0,1-.57.27A.62.62,0,0,1,6,18.8a.87.87,0,0,1,.24-.61,2.44,2.44,0,0,1,.24-.25A3.83,3.83,0,0,0,7.26,17,3.83,3.83,0,0,0,8,17.94Z\"/>\r\n</svg>";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\r\n    <defs>\r\n        <style>.cls-1,.cls-2{fill:#f4f6f8;}.cls-2{fill-rule:evenodd;}</style>\r\n        <path id=\"a\" class=\"cls-1\" d=\"M2.75,10.3A.75.75,0,1,0,2,9.55.76.76,0,0,0,2.75,10.3Z\"/>\r\n    </defs>\r\n    <use xlink:href=\"#a\" overflow=\"visible\" ></use>\r\n    <path class=\"cls-1\" d=\"M21.25,10.3a.75.75,0,1,0-.75-.75A.76.76,0,0,0,21.25,10.3Z\"/>\r\n    <path class=\"cls-1\" d=\"M12,7.2A1.2,1.2,0,1,0,10.8,6,1.2,1.2,0,0,0,12,7.2Z\"/>\r\n    <path class=\"cls-2\"\r\n          d=\"M15.84,15.05,12,7,8.16,15.05,3,10.15a24.62,24.62,0,0,1,2.09,6.42A24.13,24.13,0,0,1,4.86,21H19.14a24.16,24.16,0,0,1-.23-4.34A24.75,24.75,0,0,1,21,10.15Zm-4,2.86a.65.65,0,0,0-.64-.59.82.82,0,0,0-.68.39.84.84,0,0,0-.68-.39.65.65,0,0,0-.64.59.9.9,0,0,0,.25.63l.25.26h0a4,4,0,0,1,.82,1,4,4,0,0,1,.82-1h0l.25-.26A1,1,0,0,0,11.84,17.91Zm2.27.46a.8.8,0,0,1,.26-.05.59.59,0,1,1,0,1.17.69.69,0,0,1-.57-.29,1.18,1.18,0,0,0,.29.76h-.74a1.18,1.18,0,0,0,.29-.76.69.69,0,0,1-.57.29.59.59,0,1,1,0-1.17.8.8,0,0,1,.26.05.57.57,0,0,1-.28-.47.68.68,0,0,1,1.34,0A.57.57,0,0,1,14.11,18.37ZM16.8,17a6.39,6.39,0,0,1-1.2,1.5A6.24,6.24,0,0,1,16.8,20,6,6,0,0,1,18,18.5,6.14,6.14,0,0,1,16.8,17ZM8,17.94a2.44,2.44,0,0,1,.24.25.87.87,0,0,1,.24.61.62.62,0,0,1-.62.56.77.77,0,0,1-.56-.27,1.31,1.31,0,0,0,.32.73h-.8a1.31,1.31,0,0,0,.32-.73.77.77,0,0,1-.57.27A.62.62,0,0,1,6,18.8a.87.87,0,0,1,.24-.61,2.44,2.44,0,0,1,.24-.25A3.83,3.83,0,0,0,7.26,17,3.83,3.83,0,0,0,8,17.94Z\"/>\r\n</svg>";
const config = {
    colors: true
};
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

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
import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
const svgInput = "ss";
const config = "";
const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });
export const pathD = parseSvg(svgInput, svgoConfig);

```

#### Result:
`Throw Error`
---

## get base64 png from path d

### Use Case 1. Empty svg

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"></svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAIDODUBAAAENBzWNAAAAAElFTkSuQmCC"
}
```

### Use Case 2. Material UI icon with size 20

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path d=\"M12 19.2c-3.972 0-7.2-3.228-7.2-7.2S8.028 4.8 12 4.8s7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2m0 1.2c4.644 0 8.4-3.756 8.4-8.4S16.644 3.6 12 3.6 3.6 7.356 3.6 12s3.756 8.4 8.4 8.4m.6-8.4V8.4h-1.2V12h-3l3.6 3.6 3.6-3.6z\" />\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjklEQVR4nO2azUtUURTAfyakLaplZatKhDZuso9NHyS2j0ErErRaGkpQ0L9RVBBFtUgwgkTBsL1YQpna2ooyyjQjNxWNGhfOwOUw08y89+59z7g/uDC8eXO+3r3nnXPvQCAQCAQCgUDAGw3AEaAd6JbRLtd28B+yE+gDhoHvwFqZsQQMAb0SrHXLCWAUyFfgdKmRFxltrCMOARNlHPsFzALTMmbl2r9+8wI4QIbZBNwCVooYvwjcAc4Au4ANRX5vru2We8y934rIMbJviK5M0QTMFDH4pSS4jRFk1gEdwKsicqeARjLCfuCrMvADkEtQhwninNIxD7SQAeeXlWH9wGYHurYAA0rXcppBaFJPfhW45EHvZdFlzwTvy2GTWvPGoHMe9Z9XQTA5od6jfm6qqejjyWuuKBuu+1z3K5Zisy7T4qF6RR70oXRCZXsXCa+axPjRsmfcR3m7Zo04r7pO4LYM8zkqHcqmVhzyTBU5cbhtyTKfo1IDTFqynuKwq8tbikxxkoUA6FmQd9VW96naPkp56yoAddJGF+RdxAHDlgLTrJChABjuWfIGSZgaFWHTsWUtAGcteaaTTJQGlWlN25q1ADQqG7eTIMcswT9L9PNpB6BWbaqYPcbEyFmC3yYkM+kAGN5bMk+SIN2WYNMEZTUAbyyZXaQcgL3A5zL7fJUM03I3px2AXMQlYAxfiOH8QhXOO10CR2MkwahBqNZ5nQQPk6HXYHOVQajWeeevQRIohCoNQhTnkY7SLtUTZ8hScDeijHJBiOq84b4l5wkO6E2oGSoVhDjO62aoBwc0qHbYtKAkFIQ4zhtOWbL+uFj/BUYtRa+kSYobhLjOGxteW3aN4JA2NW3jboo0x3TecFrZdBzHPLeUzcnGZFpsBT5Z9oz5UNqitsUfkR79lh0rPo/Pb6hpZ46rfHNV2XDN99HYtKV8VY6rfHFBHY1N+j4aK5Se8yoI5rjKx5O3nf8C7CElWoocjw84Sowm4T1Wun4A+0iZFjUTCm+H9ph1QoEaedXZ2b7w5FN33l4OU0XK20mpGE2pWi11UuG9LiE3tWlfino5oi72J6klaVY6xXDTu2tq5TtzzwNV2xdGXrK994RX7fH5eJmW95fsLM3IeAf8LvObsSxN+UpolYPKuH+UHPFR3rpkh5zVDZb4758ei3Jvj8uuLk22yX5dTnZuu+TzYfkuEAgEAoFAIIAH/gJh6BsMxvEViwAAAABJRU5ErkJggg=="
}
```

### Use Case 3. Material UI icon with size 24

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path d=\"M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z\" />\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2aSWsVQRDHfyQH9WJEEwOiXjVePZicXOKHcD2Kcbm44skNEY16UEiIZxUxCK4nNepncAVRUOMGLpBEcEGMlNSD8OiaeTPdPW8C84eCMEn+VV3dXV1V3VChQoUKFQpBJ9ALbAdOAueBSyry8wlgm/6N/O20RwuwFhgEngGTGUX+Z0AdIlzTBu3AUWA0x6AteQscVu7SYg5wGvgecOD1MgGcAtooGTYDnyIOvF4+ApsoyaxfzWj8D+AxcBe4rnJXv/3MyDXczNWwDHjVgJG/gGvAVmBJSkCT3y3V0+C6/m8a/0ugi4LRDXxNMewdsBuY66FnHrAHeJ+i64vaVAh6UgLdGLALmBFQp3Dt1SBo6RWbVlDAsv+aYMQdYEFE/QuBkZSV0BUz4L0yFP8FjhSUsLQCx1JiwuwYiq8aCv8AWygeW1W3y6YrMc75SWPmmzH4qU6wVsKGkEv/k6FEln2zcSwhWQqSI5xJCHhlKFIkJtw3bOz3JW83jryxyNE+KxYZR+SE5hK5cdTwrJzzPtitaexUkW8+2G/YeigvYYuWofWEowGSnGEHr3zzwUwjY3yTd6uujTT7sRyAZosum1fnIRt0EP3y3VORHSAx67eD+1wesucOIqnqKLEDBLcc3E+yknQaS0kSj7I7YIeRsM3PQtJrOEDq+bI7YFmIOLDD6ORI0lF2B7SqrfX8fVlI+h0EjwiHmA5A93w9v9xFNIwhB8G9aeSABw5+OdUaxkUHgfToposDbjj4LxTpgOXANyMY5ZGxjD0/bwcMBdgCoZyQdfBBtkB/oCDYowPwGbxwhAiCcvnaMLYHPAbzroQ8M4/a+NM3ies1jJJLCwpYCXlnPlgi1Knpo1cykdMJPoMX7HRwylg6shI98zwJ8jjBd/CC2w5euXfMjAGjHG6P5IQQg+8wyuGzech6jVmSuzoCOyHE4AX7DJtXhmyJfdT2ky9qp0PeaN9oS+y1T/f6iOFRaT2FQE+gmRccCN0URdtfrnbzuF5UlgWLjfb9uOf1/H+cMjw7ErA/4AOx4aFhY6bsz0Kb7nuXArmWajZOGLZ9CHlLvDHh7A7VJ8yDvgS71oVWNmwo+tMkJ/QlXI9fjqGwTR8fTCZshyJiQmvCshd5EeuBBPr85EuC8vt6URkz2lsBT+RzwM61ie6UR1ITelEZIlmqYZae82l6oz+SqmFFykqoReG9nrVDh6a31ik0deYLG/zU7ZAUE2oixclNvWvoSokTrVrP79SqzlXYuPZ89GVvYbY+SJrMINKteaqJ1A2VEf3WyMvQ+mgfLeBlzRPSlmlIkaJnPSVDmzZTk15z+sq4HoGlmPWkAuqQvswINXApaQ+GKGyKRAuwSh8nuNrUSfJX21hntZlRhtdo3pAjbY2msMf18uWiypB+69PubeYGZoUKFSpUIDv+AUsrytQsHiz+AAAAAElFTkSuQmCC"
}
```

### Use Case 4. Transparent Material UI icon

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".3\" d=\"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0 12-4-4h3V8h2v4h3z\" />\n  <path opacity=\"1\" d=\"M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z\" />\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO1b3UpUURT+8AGcKMtHCHsB7aofvTyDXSRlpd5Emr1D5oiho10YKXadEYlX3mjdZFpPkClEQn+WoAZqkIY4sWENyGGvfc7+OzMHzgcLZJhZe621115/ewtkyJAhQ4ZEUA+gGUAvgGEATwE8JxJ/DwG4S98R3009agC0AJgAsAKgpEniN+NkEMErNagDUADw3UBpjr4BeEC8qxYnAIwC+ONQ8TDtARgBkEOVoQPAhkfFw/QLwC1Uya7PaAr/F8BHAAsA5ogW6LN9TV7TlfSGcwDWYgh5QEoWyFOCCOoEMEC/OYjB/zOAhqSVbwKwHSHYOqW7qzGU5kj8tgjgZ8RaWyRTIjgfEeh2KKe3WigeplYyxJ5iXSFTYxJuv60QQpzlaw4VD1M7gMUIT2jwGfDWmIWPADzxqPhxylNxpYoJtT4MMMMseAigPyHlj1OB1pbJ9NK18h2Kna+E8seNwHnCDZeuv8EskpTbq2hCUSw5qREeMQu8qQLlyzFhiZFRZA4r1DEpb8dztNel60yKFJ+dsjFAgbHskKXAokCaDdGwJc9RRtY+U+VrqA0NM/zhoMiZlfCdteR5hakYv5rOE1o87b4vAwR05mUyXzIxwISE0YFlbe/bAG0A/kl4PzYxwKqE0ZwDIX0aQNBrCe9lXeXrGVcqpMAAg0zBdkbHAM2MATpSYIAuF3HgHjPJyafAAHmSNcy/R8cAReYcBSkwQMCM4UWdERuTEgZvU2SAdxL+IqvFxpTHDJCEAeYl/J8laYDbAH4zwciERO9xJ0kDTDo4Aq6MoKu8kyNQdBQEu0kBG+W7HQVBUcLHRq/DNGjqCSY7H5CMsgsWYUjrQqjTMCjpeoLpzjsrhOqpfAwzGTAUKqBCZMez8qpS+DQ0sWKZCUw8wVZ5rhn6AAOMM+1wm6WAnCe4UJ5rh8dMDNDM7FLRUkiZJ7hQPqC3AzKZL7gciW3Q+MlW2HJ2MI32cUdiX2ye2PR79IKyJ7jY+UAxvjceioJGyrJx8y5dVAZVQu3M+F7IeRKWGGEsu+hwPmBDQob3jIxa1R+HHF0zlZj6utIGkPUtJYoHzm6JbypydyUvRwcUconbIqeYZhY6dDgs1VWeux5/AQ/I0eODkuI4JBET8gq3F/TJ1wMJ0POTLcXiS+R6PqM9F/AEbQI4C89oingktUcXlS6KpTK1Up6PWtf7I6kyGiM8oUSZo2jZO7RRGo56hbqZpPLHj4MqJpRJNCevqE3tiogTefrOIHV1ssZGdua9uz2HWnqQVNKgfbp3XKTh5Tz9vRrzZWg42nsLeLp1Alcs+aB1CohVhVyM15y2tEvlbVXsuqqB6qOXGa4UFy3tfReNTZKoAXCRHicsayp8RGOsMRpmpOpfZjiIoeRlGok9pGpuimiSPuuh6a32ADNDhgwZMkAf/wEgejYxrLkGogAAAABJRU5ErkJggg=="
}
```

### Use Case 5. Additional attributes (remove colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".64\" d=\"M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2\" />\n  <path opacity=\".8\" fill-opacity=\".5\" stroke-opacity=\".3\" stroke=\"currentColor\" stroke-width=\".24\" d=\"M2.4 2.4h7.2v7.2H2.4z\" />\n  <path stroke=\"currentColor\" stroke-width=\".48\" d=\"M2.4 19.2h19.2\" />\n  <path opacity=\"1\" d=\"m12 2.4 9.6 19.2H2.4z\" />\n  <path opacity=\"1\" d=\"M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304\" />\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaElEQVR4nO2azUsVURjGf1Gu2pZKVP4TdW9FuwgCcWkyhC67FbQIxQixiCCu5LagxBZqESiZqwgXQS5y06bA/oCkne0i+sI48A5M08ydM+ecmTnaPPAsHC/3zvNxzsy890KNGjVq/Iv9wGngAnAOOMJ/gj3ABPAF2I7wN/AC6GWX405MeJybwAgQ5GQ/0AX0AU35ewi4KhySY015zb6qDPiUYYDiPeCiJkeB+8Az4DEwH+OGMH58FrgBDADdZRrwKkP8T2A8Q3QLaAMrwFtgHVhLELko7/cLWEr4f8g5YBJoyBItFL3A+xTxP4AHGeLbYuJ6jEkGbETeO6kFSZwSIwrFXmAQWAU+iIAlqXOa8DHgeYLwNAPC9EMDsloQ53gZSyPQXOd3gTcdxCcZEE0/bwtCzgAnqzSgJZtVJ+FJBsTTN21ByKCovSHoIP4S8FRTfNyApPRNWxDysizdUgxoAQs5xEcNSEvftgWKV1w3IUgxQLf2SQZ0St+2BeFyKNSAtoH40ICs9F20QPFUUQaMiRBTA3TSd9GCR64ukUHMgCVD8SF10nfVgnHXBrQtxW/mEO+iBYrHXRnQSrm91eU7eZzOa4BtC6ZsrwqBo/Q/G4h31YKGCwNWKkjfVQsmbA0YjTzSlp2+ixbM2VwRAhlmVJW+qxaooYoR+mWSs2ZIk52/iBZcNzWgK2WMpUPdu74yWjBrOmPss3A9z11fGS0wGuuf8CR9Fy0wuhwOeJS+bQvUfpYb5z1K37YFasaZGyOepW/TguEyDFgsOH2bFgyXsQQ2ShBv2oLBojfBxZLSN22B0SbY9DR9kxYYzQaOepq+SQsOm94Kz3qafp4WGN8KI19R+5h+nhYYPwzpbIRVpq/bAqMNMMQBGSr4mL5OC9S5H8QSkx6nn9UCq5FYp8uhL+lntcB6NI6Mltsep5/WAuuxeBQNj9NPa8ExHGPM4/TjLXDy1Vgc3fLmPqYfbcG8i50/DQseiMyi+uVKIegBvnogMIvfgENFGDDtgThdqnO1xhngmvAm8N0DYbpU+9StyPkrLblxG/go3PJAVF5uRc5fadn1a3+7qL1g2gMxle0FPTs0fWctmPZARGUt6Nnh6Vu34Czw0CHVr7ufAMvAS/k5/mvhqhxbltfMOP5spaVGjRo1atTgb/wBjHHuhdXXcZwAAAAASUVORK5CYII="
}
```

### Use Case 6. Additional attributes (with colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path opacity=\".64\" fill=\"#0f0\" d=\"M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 1 0 0-19.2\" />\n  <path opacity=\".8\" fill-opacity=\".5\" stroke-opacity=\".3\" stroke=\"#f0f\" fill=\"#00f\" stroke-width=\".24\" d=\"M2.4 2.4h7.2v7.2H2.4z\" />\n  <path stroke=\"#f0f\" stroke-width=\".48\" d=\"M2.4 19.2h19.2\" />\n  <path fill=\"#ff0\" d=\"m12 2.4 9.6 19.2H2.4z\" />\n  <path fill=\"#f90\" d=\"M2.88 1.728a1.728 1.152 0 1 0 0 2.304 1.728 1.152 0 1 0 0-2.304\" />\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVUlEQVR4nO1aXWgURwD+crk+ldIXtVKuKUQoPrRC0RjbCnkIghIEfYglFEX60NOiHDEhqXi2qGijRoRiEtcYhahBNI36VMSHgEIbRCEqrYhQRKVQaPum1cvJV+YuW851b52dmb2b6H7wwd3ewu33MzO7cwfEiBEjhgccxpt0sJRH8AUPYzn78B5eB5CooYNtdPAPHbCEz+jgPA9hLl5l0MEuj/Dn+Pjg2w+zb/25LgO2heFxsAXEGyDeB9EIQrz/vIHYLCheTx9rnD4nWR0DDuNBkAGC7c0H9gP8Soqp+x1YNdb3Wff3p0EcA3GilCPEb4Le4yCGQGwFsRLEnMoZ4OBikPj8QGJqSf3PXYGiE/k0msZ7sOmHC8ju/AXZnRML93Ve8YqsJ84+IaaeEvkPiFEfE1wOg9gOYjGImmgNOIS5dHDTT3yuP5nrWd3dHyheCN/Se1GILqWfASJ5EhQs0wI/7i0YEakJZ1BLB60Psh9furtr3q0b2Y8mfkyvHl2QmuwoK7zuXic29o15hZczwE3fNUCiBV52RT40MmCb1DhfenkPvtlzuZx4PwNK01dogctBEJ9Uz4BEPo22U0NBwv0M8Kav0QKXbZHMDZkgA5K5Dfjy6IiMeK8BfulrtMDlRhC1lTEgkU9j/bGTsuJLDSiXvoEWCH5ttAmZcgZI1t7PgKD0DbSgOBwiNaBpvCeseNeAl6VvqAWCn0ZjQN29TmzdfUXVAJn0DbXgiJElMuM1ID0wqiJecMVAekImfYMt6DJrQJNa9V2ev/nhQ1nxhlog2GDGgEQ+7Xd7K8vU/o7rT3K1z8IaYKAFe7VWhYxrgGb6g9cW/hFWvMEWLNY3YFPhqU45/ce5ZOj0DbZgm54Bqfsd7iNtpdM31IJh5RUhIwxYNdZXrfQNtmClkgHHwRaxkyPWcBWqzPwRtaBbyQAU9/Be2MaSoexdX4VaMKS2x8jC5qSS62Hu+irUAoVtfWKJDekbaoHCcsjCjqwV6RtoQYuKAWtsSd9AC1pVDFhnU/qaLVgbuQH1Eaev2YK1kQ+BkQqkr9GC1kgnwfoKpa/RAqVJsNHG9BVboLA3QNTZmL5iC1Kqt8JDNqYfsgWKt8ICxZ+orUs/ZAsUH4YkJsJqph+iBQoToAti1vSmgnXpS7ZAXPtsaIGFPydYmb5EC9S3xIKWQ1vSl2hBgwkDakD02Jp+QAv0tsWfQ/H/OVamH9CCRTAKotPW9H1aoP/T2Asg5swjTtiYfmkL5hcN0Jz5y+AOcbLaIl/G28QIogCJd0g8qrZACf5L4t0oDOi1QJwse/UFg80E2wtcMPktc8mnFgiTYy45xUVXv/v/+sFmFQN2FIcUb7N/w99VFxWW4prd6wd3vA5jn5HMBZxZY9/sXMCZm76ZFnBmp6/XAs789PVaQGIZCccUp4jBv4hTvxPnfiV+miQuXSPGBcVrcUx8Js4R55r8bqFFqQUxYsSIEQOvNv4DXOM7cqEN1K0AAAAASUVORK5CYII="
}
```

### Use Case 7. Fill None (remove colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M12 20.5a8.5 8.5 0 0 1 0-17Z\" />\r\n  <path stroke=\"currentColor\" fill=\"none\" stroke-width=\".5\" d=\"M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z\" />\r\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg=="
}
```

### Use Case 8. Fill None (with colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M12 20.5a8.5 8.5 0 0 1 0-17Z\" />\r\n  <path stroke=\"#000\" fill=\"none\" stroke-width=\".5\" d=\"M12 3.3a8.7 8.7 0 1 0 0 17.4 8.7 8.7 0 1 0 0-17.4z\" />\r\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUklEQVR4nO2az0uUQRjHP7WRnbIuJUW36lIqWV5jITINkf6JKAz78QdU14hOleStyMpMvFZegqg0UkgrtcxfFxMqM6FMPbgx8BVEVNbdmfd9B+cDyy7L7LMz33fmmWeeZyAQCAQCgUDALSmgHKgD6oFnQBfwWa8ufVevNkf0G69JAVXAI+A3kNH7F6AHeK/3y8A14C7wCviptpPAQ6DSNzG2ALXACDAPDAB9wLQGtvS1lA3AAeAC8Fo2hoGzQAEJ5xQwCszo6a406NUEWMpeLY1/ErWGBLIdaNXT+gjMZTHwbAVYYBfwQP/RAhSSEA7pyXwHvq1h4GsVYIFjwBgwBJQSM2lgSp58NofB5yKAYQfwQk7V9CEW0lqXPTkOPB8BkEN8oj6k45j2U0BvnoPPRwDDRolgZkIJETq8EU37TMwCLMwEsxwGo3KMrXJ4swkRwLBTDriZCPb5+Ry9vUsBDMdlrxqHEd6o9vlMAgVAYfewq4ixVhHeXIIF2K0+nrFsl01yfPluea4FMNxRkGT1AFWltT/tgQD71NcK22vrq4PBuxDA0A402jKWUqDR55EAF4FfCpTyplwd/euRAMWyXWbD2HllZzIeCWCSKhPAORvG6pXG8kkAwxvgpg1DbUC3hwKYHONzG4Y6PRXgBvDWhqF+RwGQawGuaufKm/71LkDnel8CbR47QVNtsrINDngoQLutbbBuUWlrXQZC5eroH48EKLEZCqcUCvd6JMAlzQArhyFUpfXpONwB3LdpsNKjhMh+2TVJUmukPEqJNbhIiaH6/IzFeoALAfaoj6dxlBYfSXhavFlPfzOOqJEvGEugACdk7ySOaUlgaawIGAeaiIBtmmZJKo6+1Da9lYgoVXichPJ4iwI1kwiN5YLEh5gEKNDgTWxylJhIL7r7F+UVmSJN+8k4B7/44GEuJ/zIcXfIxduPa80fJCEUag/OKE6YcSCACXIe6zdNUTq8tVCt+vyswuZsqknZxPYNEnUwin0+XwpUnx/WAM1U/bRKPmG5ZEaxjrQdajOk8NZZhOeClErUjSpUZnSzbEA5xm7NkivAdeCeqjkLbSd0pK3w7bL0Svv1YaWobgNPgXdKuffrs/nultqU2UxmBAKBQCAQCLAM/wHmwNLJpQ3dxwAAAABJRU5ErkJggg=="
}
```

### Use Case 9. Fill Rule Even Odd (remove colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path d=\"M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2\" />\r\n  <path fill-rule=\"evenodd\" d=\"M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94\" />\r\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD00lEQVR4nO2aR2gWQRSAP2Psjdh7BUWI4MF6UVSwK3qwk4M38aASokHFBioKehEPSiKC7Wb3IjbUiNgOEURQRFQ0KnbBlsTIwFsYht3Nv9nZ9YedDx6BzMxr2WlvAg6Hw+FwOBwOh8ORPr1FMkd/oApoELkJ9CNDVGnBe3KDjNDHJ3hPepEBemY9AcicN4O/ToboJ3NeD74vGWQtUEZGaQ48AZ4BhWSQpdoUWELGaAY81BLwCCggz5gNbASGJqB7rs8uMCcBO8MkhllRB5Zojn0Gult27JZPAu5YttED+KLpXxZl8CHDuWkWHZsSchCabNHOdEO3iiln5gF/ZWANUGTRscshCbhk0U5n4K3o/SsxRWIcsAJYZNGpMSHBe6L62GKRxDA+jpISYJclh87kkIDTlmyVi++xaQG8AvbH3KqGA/U5JEB9rsUxt9i9wBugJZbYIM4diXFqO5ZD8J4cjXG6rBAdavuzRjfgjyg+IV9FFAYDtRESUCtjotBCfGsQX21v3ZzTHLwAtIkw9mCE4D05EEG/+tRPamPPkwALDAevAR1yLID8bEICfkn1qDHaAheNsYtJgNZyKtQN3ZX9Noy9TQjekz2N6O7kU1/8JklJhEofJx8AXQP6dwG+x0jAd9HhR1exbY5RC3VizA9w9HHA57otRvCebA2YVvptUpeFSSagvcxNP8PPgSFa33bABwsJ+GisNQOApwF963KYkrG5EuLsG+0Qs85C8J6o0pl3vX0Z0k/dMhOnrBFn1QVkrFyibCWgRnR6l5sg2ZRGAsbm4HCdxeCj6JyYRgJahawD/1PqczyXWOFOHgRsitoVUmNfHgTcEKfiE5dVeRCwKaVpJmB1wBw8n0KgVwNOl8qn1Fjj48AOWSCrjd//BlYCU+UWqd4EZ0q15qvR97gUYHcHBP9OrrkrfNqUT6lRahivkEoMciR+rrUd1sYVGtfoHcYhqiCkeFqn1feb+ZTXUp0CZZrhkz6lsiHazfFsiB6veqPkhRxzFR2B21plWv1cboxtI1dyb3yqj6zrNMODAvps15z3e5kZLdND9VkfoGOO9nSmplfYG4PyKTW2aoYHap+lNw3Mz/sHMElrGymXHK896PmtQCumnJKan0exoWMLKXJQM1wtC9ABeXzYLH99swqkVu4R8s8R7422SlncRsnr0Ay575cHFEiKpFLd1BKa1fpgg8hO+au8C9nCqht5GfoiBdjHAe1qq50gVWOzLWytsc69hPb4T8B92RGC+gTVGFR5LjVeJ5SAOKKmRCoURKzxpyW1+fhPFg6Hw+FwOMhb/gG+OGYZB8DSVwAAAABJRU5ErkJggg=="
}
```

### Use Case 10. Fill Rule Even Odd (with colors)

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\r\n  <path fill=\"#f4f6f8\" d=\"M2.75 10.3A.75.75 0 1 0 2 9.55a.76.76 0 0 0 .75.75m18.5 0a.75.75 0 1 0-.75-.75.76.76 0 0 0 .75.75M12 7.2A1.2 1.2 0 1 0 10.8 6 1.2 1.2 0 0 0 12 7.2\" />\r\n  <path fill=\"#f4f6f8\" fill-rule=\"evenodd\" d=\"M15.84 15.05 12 7l-3.84 8.05L3 10.15a24.6 24.6 0 0 1 2.09 6.42A24 24 0 0 1 4.86 21h14.28a24 24 0 0 1-.23-4.34A24.8 24.8 0 0 1 21 10.15Zm-4 2.86a.65.65 0 0 0-.64-.59.82.82 0 0 0-.68.39.84.84 0 0 0-.68-.39.65.65 0 0 0-.64.59.9.9 0 0 0 .25.63l.25.26a4 4 0 0 1 .82 1 4 4 0 0 1 .82-1l.25-.26a1 1 0 0 0 .25-.63m2.27.46a.8.8 0 0 1 .26-.05.59.59 0 1 1 0 1.17.69.69 0 0 1-.57-.29 1.18 1.18 0 0 0 .29.76h-.74a1.18 1.18 0 0 0 .29-.76.69.69 0 0 1-.57.29.59.59 0 1 1 0-1.17.8.8 0 0 1 .26.05.57.57 0 0 1-.28-.47.68.68 0 0 1 1.34 0 .57.57 0 0 1-.28.47M16.8 17a6.4 6.4 0 0 1-1.2 1.5 6.2 6.2 0 0 1 1.2 1.5 6 6 0 0 1 1.2-1.5 6.1 6.1 0 0 1-1.2-1.5m-8.8.94a2.4 2.4 0 0 1 .24.25.87.87 0 0 1 .24.61.62.62 0 0 1-.62.56.77.77 0 0 1-.56-.27 1.3 1.3 0 0 0 .32.73h-.8a1.3 1.3 0 0 0 .32-.73.77.77 0 0 1-.57.27.62.62 0 0 1-.57-.56.87.87 0 0 1 .24-.61 2.4 2.4 0 0 1 .24-.25 3.8 3.8 0 0 0 .78-.94 3.8 3.8 0 0 0 .74.94\" />\r\n</svg>";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
```json
{
  "pngBase64": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO1aSahcRRStOMVZnMc4giJEcKFRN4oKzoounMnCnbjQEJKIBjWCioJuxIWSBCEOuzhvxAk1QeKw+AERFBEVv/kav919x+6f/Cv3d7/u193v9fi687HfgaKh+9Wte8+runXrVIeQI0eOHDly5MiRI0eOHGMGEZ3iLUwamPl0JN2GrLbQSL9k5mVhUoDx4BskfBEmAUR0alvwUUM8OfzfgYgnTTQBDl/zCUvg8zApYOZlvubjwRPRaWHSgMhrEXlNmESY2f5I8iOQ/mxmB4RJA3D5nmgJAJfvDpMEM1uCLDsbOUC+N7P9wmICot6ErOuLqudmbZtIb2ndBYj05qzHKaqe5zEg6o19dUTmlQ3n5F8AOCFLx4B0eysBwLIj0zEATkSWQsM+39uPg5ubCxS5NjPHRK5OK4RA5KqsxkGU65psk27uuTOR3gok81Xm9M9CwY7OzDHSj1MrQdKPshqnULBjkHVXNXiZ95j6MkBElxLJ/cB8Z1ZOEVVWpAZfzwWVFVmN5757DMx82cBGkHklkDybjUPyTjcCgOXtLMZC1ofd96ENmdmBwPo7sr40zFZVUj0fSPZ2JYBkHqC8fAh/lyDJC8A6bWYHhSyArI/WEsmWQas2JHm9W/CxXPDaoNUlsG6s2VkfskKpVDoeSCq1ouVNnxX99BeRs4FkrlcC/Fnv088Y7pP7VutfyXrrDsDyXmydfmBmh/TeV1/p+e3Xx9CXe7XvUx1Ztsb8e3/gQNMAXL69ZZp+9rfZEaEHAQRIpG8CSNTVo272zexQIP2wmbzyXSFrmNnBXhW2ZOyvfb/t1M8TUr/BN0iW5zvZnp21o9r0RZKSkxJGASDdlLBtfVcqlY5Ler5YLB6LJDAEAeA2kmz7mD52+8zRLWFUINLbUhz9IWm6AsmTAwffWAobknXF2GmyefrfMTICZswO97WZ7Kj+UhA5J3rWzA5D1t3DEoAs/8RzDTOfgaQ/pZC1p9uSHBpI+kmHzD0dFTHIum744OttbXS8BdLf0meLbh9p8A5kXdPF2V1EdIkforIiwG25zehw06E9FkYNqjrSbd3uyfDt92yzxHzFyAkws6VpeWBfNj9n9FKXZAJg2bGvA25vsjOMC8j64uKbAX0oPsMCSB9cdASwrh4nAQ8lrUE/hIw8WNJPk6pL92mcBKxKIOBpT5DIMtXyfblE8gCKXOOnyIU7QdQbFpRnkmJzcPKGC7BA8lwKATN+zHWZK4GAVeMjgHV1y/Tb6EqM/+YlsVeFMcdejfq5mBI/RjtpMRvTccWpVTxd2AZr+r6P1SqvjXUJYFMxJFtbpTIviaOTI7C8m2Ynpt44Ub96mevf7zY7Eli/qivT/ilyX7yvE+lH8hgJ47tkxViZKyJnJT0DJE/VnU+4mSGqXOzLo2bnkSQbflsUuzpb2uWOYV0YF4BkQ4yAM6NpGS2DtulNwiByZfQbYvlCP+REv6ddv/nMisQUYHnLNb+6fSgvj9tA1idGH3mixCVTnoBcwvLLB2R93N9+mwpEAgDlCxb+HMH6V0sC21RNbpWL/HYIUa/3835V2m4XSPyipqZUDyShZaoPYuMtP1N9KzqTvo3JVMebIZaCC7CuLyTu9SR7S8yXu2rcXgek55pREPDNaPZ5mQWWb31H6PBcosbg8twYCdA/RkPA4M2XxFiCt2pimlt0BJDMLbo/WeTIkSNHjhw5wmLGf26RJBRR+0nMAAAAAElFTkSuQmCC"
}
```

### Use Case 11. Throw on invalid SVG for PNG conversion

#### Code:
```ts
import { getPng } from "@svgd/utils";
const svgInput = "invalid_svg";
export const pngBase64 = await getPng(svgInput);

```

#### Result:
`Throw Error`
---

## Generate Constant Name

### Use Case 1. Default file name for home icon

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "iconsGroup1Subgroup1Size24Home"
}
```

### Use Case 2. Format PascalCase

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "PascalCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "IconsGroup1Subgroup1Size24Home"
}
```

### Use Case 3. Format Snake_case

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "snake_case";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "icons_group1_subgroup1_size24_home"
}
```

### Use Case 4. Format SCREAMING_SNAKE_CASE

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "SCREAMING_SNAKE_CASE";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "ICONS_GROUP1_SUBGROUP1_SIZE24_HOME"
}
```

### Use Case 5. Format material (3d_rotation)

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/3d_rotation_24px.svg";
const baseDir = "src";
const template = "";
const format = "material";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "ThreeDRotation"
}
```

### Use Case 6. Template {-2}{1,-3}{-1}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "size24Group1Subgroup1Home"
}
```

### Use Case 7. Template {1,2}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "group1Subgroup1"
}
```

### Use Case 8. Template {0,0}

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "icons"
}
```

### Use Case 9. Template {-1} (Negative index)

#### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

#### Result:
```json
{
  "constantName": "home"
}
```


---

## Generate File Name

### Use Case 1. Default file name for home icon

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "icons/group1/subgroup1/size24/home"
}
```

### Use Case 2. Template {-2}{1,-3}{-1}

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "size24/group1/subgroup1/home"
}
```

### Use Case 3. Template {1,2}

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "group1/subgroup1"
}
```

### Use Case 4. Template {0,0} (picking first segment)

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "icons"
}
```

### Use Case 5. Template {-1} (Negative index)

#### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

#### Result:
```json
{
  "outputFileName": "home"
}
```


---

## Find svg files in a directory

### Use Case 1. Many levels svg folder

#### Code:
```ts
import { getSvgFileNames } from "@svgd/utils";
const filePath = "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons";
export const svgFileNames = getSvgFileNames(filePath);

```

#### Result:
```json
{
  "svgFileNames": [
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\fill-none.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\rule-even-odd.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\icon1_20px.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\icon1_24px.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\subdir1\\subdir2\\icon5_24px.svg",
    "C:\\work\\svg\\svgd\\packages\\mocks\\inputIcons\\test_icon.svg"
  ]
}
```

