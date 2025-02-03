import { getDTS, getExports } from './exports';
import { getSvgoConfig, getSvg } from "@svgd/core";
import { getPng } from "./png";
import { exportAllSvgInDirectory, collectSvgsInDirectory } from "./exportAllSvgInDirectory";
import { generateFileName, generateConstantName, NameFormats } from "./nameFormat";

import type { NameFormat } from "./nameFormat";
import type { DCollection, DInfo, Declaration, Declarations, WithChildrenDeclarations } from "./exports";

export {
    getSvg,
    getPng,
    getExports,
    getDTS,
    getSvgoConfig,
    exportAllSvgInDirectory,
    collectSvgsInDirectory,
    generateFileName,
    generateConstantName,
    NameFormats,
}

export type {
    NameFormat,
    DCollection,
    DInfo,
    Declaration,
    Declarations,
    WithChildrenDeclarations
};
