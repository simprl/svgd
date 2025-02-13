import { generateConstantName } from "@svgd/utils";
import { filePath, baseDir, template, format } from "./data";

export const constantName = generateConstantName(filePath, baseDir, template, format);
