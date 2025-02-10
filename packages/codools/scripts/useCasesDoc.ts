import { getApiMD, saveMD } from "codools";
import { stories as getPaths } from "tests/stories/getPaths/stories";
import { stories as getSvg } from "tests/stories/getSvg/stories";
import { stories as getSvgoConfig } from "tests/stories/getSvgoConfig/stories";

saveMD("api.md", [
    getApiMD({ title: "getSvgoConfig", stories: getSvgoConfig }),
    getApiMD({ title: "getPaths", stories: getPaths }),
    getApiMD({ title: "getSvg", stories: getSvg }),
].join("\n---\n\n"));
