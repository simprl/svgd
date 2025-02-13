import { join } from "path";
import { readFileSync } from "fs";
import { getESMPath } from "codools";

const inputDir = getESMPath(import.meta, './inputIcons');
const outputDir = getESMPath(import.meta, './outputIcons');

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
    "attributes": [
    ]
  }
];

export const commonMocks = mocks.map((mock) => ({
  ...mock,
  svgInput: mock.svgInput ?? (mock.svgFile ? readFileSync(join(inputDir, mock.svgFile), 'utf-8').trim() : ""),
  svgOutput: mock.svgOutput ?? (mock.svgFile ? readFileSync(join(outputDir, mock.svgFile), 'utf-8').trim() : "")
}))
