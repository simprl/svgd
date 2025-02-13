import { getApiMD, getESMPath, saveMD } from "codools";
import { stories as generateConstantName } from "tests/stories/generateConstantName/stories";
import { stories as generateFileName } from "tests/stories/generateFileName/stories";
import { stories as getSvgFileNames } from "tests/stories/getSvgFileNames/stories";

saveMD(getESMPath(import.meta, "../docs/api.md"), [
    getApiMD({ title: "Generate Constant Name", stories: generateConstantName }),
    getApiMD({ title: "Generate File Name", stories: generateFileName }),
    getApiMD({ title: "Find svg files in a directory", stories: getSvgFileNames }),
].join("\n---\n\n"));
