import { getStoriesMD, getESMPath, saveMD } from "codools";
import { stories as getPaths } from "tests/stories/getPaths/stories";
import { stories as getSvg } from "tests/stories/getSvg/stories";
import { stories as getSvgoConfig } from "tests/stories/getSvgoConfig/stories";

saveMD(getESMPath(import.meta, "../docs/stories.md"), [
    getStoriesMD({ title: "Get config for svgo for convert svg to d attribute of tag path", stories: getSvgoConfig }),
    getStoriesMD({ title: "Convert pathD to array paths tags attributes", stories: getPaths }),
    getStoriesMD({ title: "Get svg from pathD", stories: getSvg }),
].join("\n---\n\n"));
