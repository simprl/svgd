import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";
import { CLIOptions } from "@svgd/cli";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [
  {
    title: "No arguments",
    args: [
    ],
    options: {
      colors: false,
      size: 24,
      dts: false,
      format: "camelCase",
      html: "",
      input: "src/assets/icons",
      md: "",
      output: "src/components/Icon/paths.js",
      quote: false,
      template: ""
    } as CLIOptions,
  },
  {
    title: "parseCliArgs returns correct options",
    args: [
      "node",
      "script",
      "--input", "icons",
      "--output", "out.js",
      "--quote",
      "--template", "ICON_",
      "--format", "snake_case",
      "--md", "readme.md",
      "--html", "index.html",
      "--dts", "true"
    ],
    options: {
      colors: false,
      size: 24,
      input: "icons",
      output: "out.js",
      quote: true,
      template: "ICON_",
      format: "snake_case",
      md: "readme.md",
      html: "index.html",
      dts: true,
    } as CLIOptions,
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ args }) => ({ args }),
  output: ({ options }) => ({ options }),
});
