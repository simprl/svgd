import { getStoriesMD, getESMPath, saveMD } from "codools";
import { stories as generateConstantName } from "tests/stories/generateConstantName/stories";
import { stories as generateFileName } from "tests/stories/generateFileName/stories";
import { stories as getSvgFileNames } from "tests/stories/getSvgFileNames/stories";
import { stories as parseSvg } from "tests/stories/parseSvg/stories";
import { stories as getPng } from "tests/stories/getPng/stories";

saveMD(getESMPath(import.meta, "../docs/stories.md"), [
    getStoriesMD({ title: "Parse svg to path d", stories: parseSvg }),
    getStoriesMD({ title: "get base64 png from path d", stories: getPng }),
    getStoriesMD({ title: "Generate Constant Name", stories: generateConstantName }),
    getStoriesMD({ title: "Generate File Name", stories: generateFileName }),
    getStoriesMD({ title: "Find svg files in a directory", stories: getSvgFileNames }),
].join("\n---\n\n"));
