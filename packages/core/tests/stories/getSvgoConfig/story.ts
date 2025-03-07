import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
import { svgInput, config } from "./data";

const svgoConfig = getSvgoConfig({ ...defaultConfig, ...config });

export const pathD = optimize(svgInput, svgoConfig).data;
