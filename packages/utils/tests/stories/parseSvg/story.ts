import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
import { svgInput } from "./data";

const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true })

export const pathD = parseSvg(svgInput, svgoConfig);
