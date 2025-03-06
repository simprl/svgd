import { optimize } from "svgo";
import { defaultConfig, getSvgoConfig } from "@svgo/core";
import { svgInput } from "./data";

const svgoConfig = getSvgoConfig({ ...defaultConfig, colors: true });

export const pathD = optimize(svgInput, svgoConfig).data;
