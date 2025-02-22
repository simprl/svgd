import { getStoriesMD, getESMPath, saveMD } from "codools";
import { stories as getESMPathStory } from "tests/stories/getESMPath/stories"



saveMD(getESMPath(import.meta, "../docs/stories.md"), [
    getStoriesMD({ title: "Get path of current file in esm project", stories: getESMPathStory }),
].join("\n---\n\n"));
