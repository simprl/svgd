import { optimize } from "svgo";
import { getSvgoConfig } from "@svgo/core";
import { svgInput } from "./data";

const svgoConfig = getSvgoConfig();
export const pathD = optimize(svgInput, svgoConfig).data;
