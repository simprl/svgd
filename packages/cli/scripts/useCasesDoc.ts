import { getStoriesMD, getESMPath, saveMD } from "codools";
import { stories as generateStory } from "tests/stories/generate/stories"
import { stories as parseCliArgsStory } from "tests/stories/parseCliArgs/stories"
import { stories as templatesStory } from "tests/stories/templates/stories"


saveMD(getESMPath(import.meta, "../docs/stories.md"), [
    getStoriesMD({ title: "Generate files", stories: generateStory }),
    getStoriesMD({ title: "Parse cli arguments", stories: parseCliArgsStory }),
    getStoriesMD({ title: "Files templates", stories: templatesStory }),
].join("\n---\n\n"));
