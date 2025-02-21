import { getPng } from "../../../src/getPng";
import { svgContent } from "./data";

export const pngBase64 = await getPng(svgContent);
