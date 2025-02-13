import { getApiMD, getESMPath, saveMD } from "codools";
import { stories as getESMPathStory } from "tests/stories/getESMPath/stories"



saveMD(getESMPath(import.meta, "../docs/api.md"), [
    getApiMD({ title: "getSvgoConfig", stories: getESMPathStory }),
].join("\n---\n\n"));
