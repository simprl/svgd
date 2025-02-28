import { generateSvgConstants } from "@svgd/cli";
import { cliOptions } from "./data";

const [file1, file2 = undefined, file3 = undefined, file4 = undefined] = await generateSvgConstants(cliOptions);
export {
    file1,
    file2,
    file3,
    file4,
}
