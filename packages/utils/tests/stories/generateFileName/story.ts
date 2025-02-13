import { generateFileName } from "@svgd/utils";
import { filePath, baseDir, template } from "./data";

export const outputFileName = generateFileName(filePath, baseDir, template);
