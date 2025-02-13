import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";

const story = useStory<typeof inputModule, typeof outputModule>({
    dir: getESMPath(import.meta),
});

const mocks = [
    {
        title: "Default file name for home icon",
        filePath: "src/icons/group1/subgroup1/size24/home.svg",
        baseDir: "src",
        template: "",
        outputFileName: "icons/group1/subgroup1/size24/home"
    },
    {
        title: "Template {-2}{1,-3}{-1}",
        filePath: "src/icons/group1/subgroup1/size24/home.svg",
        baseDir: "src",
        template: "{-2}{1,-3}{-1}",
        outputFileName: "size24/group1/subgroup1/home"
    },
    {
        title: "Template {1,2}",
        filePath: "src/icons/group1/subgroup1/size24/home.svg",
        baseDir: "src",
        template: "{1,2}",
        outputFileName: "group1/subgroup1"
    },
    {
        title: "Template {0,0} (picking first segment)",
        filePath: "src/icons/group1/subgroup1/size24/home.svg",
        baseDir: "src",
        template: "{0,0}",
        outputFileName: "icons"
    },
    {
        title: "Template {-1} (Negative index)",
        filePath: "src/icons/group1/subgroup1/size24/home.svg",
        baseDir: "src",
        template: "{-1}",
        outputFileName: "home"
    }
];

export const stories = story.getStories({
    mocks,
    input: ({ filePath, baseDir, template }) => ({ filePath, baseDir, template }),
    output: ({ outputFileName }) => ({ outputFileName }),
});
