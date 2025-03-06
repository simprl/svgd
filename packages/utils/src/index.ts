import { getSvgoConfig, getSvg, defaultConfig } from "@svgd/core";
import { getPng } from "./getPng";
import { parseSvg } from "src/parseSvg";
import { getSvgFileNames } from "./getSvgFileNames";
import { generateFileName, generateConstantName, NameFormats } from "./nameFormat";

import type { NameFormat } from "./nameFormat";

export {
    getSvg,
    getPng,
    getSvgoConfig,
    getSvgFileNames,
    generateFileName,
    generateConstantName,
    NameFormats,
    parseSvg,
    defaultConfig
}

export type {
    NameFormat,
};
