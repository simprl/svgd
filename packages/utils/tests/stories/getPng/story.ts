import { getPng } from "@svgd/utils";
import { svgInput } from "./data";

export const pngBase64 = await getPng(svgInput);
