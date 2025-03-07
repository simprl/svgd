import { parseSvg, defaultConfig, getSvgoConfig } from "@svgd/utils";
import { svgInput, config } from "./data";

const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config })

export const pathD = parseSvg(svgInput, svgoConfig);
