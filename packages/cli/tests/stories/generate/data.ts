import { CLIOptions } from "@svgd/cli";

export const cliOptions: CLIOptions = {
  input: "tests/fixtures/empty",
  output: "tests/output.js",
  quote: true,
  template: "",
  format: "camelCase",
  md: "",
  html: "",
  dts: false,
};
