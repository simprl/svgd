import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";
import { resolve } from "path";

const story = useStory<typeof inputModule, typeof outputModule>({
    dir: getESMPath(import.meta),
});

const mocks = [
    {
        title: "Many levels svg folder",
        filePath: getESMPath(import.meta,'../svgFiles'),
        svgFileNames: [
            getESMPath(import.meta,'../svgFiles/test_icon.svg'),
            getESMPath(import.meta, '../svgFiles/subdir1/icon1_20px.svg'),
            getESMPath(import.meta,'../svgFiles/subdir1/icon1_24px.svg'),
            getESMPath(import.meta,'../svgFiles/subdir1/subdir2/icon5_24px.svg'),
        ]
    },
];

export const stories = story.getStories({
    mocks,
    input: ({ filePath }) => ({ filePath }),
    output: ({ svgFileNames }) => ({ svgFileNames }),
});
