import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";
import { inputDir } from "@svgd/mocks";
import { join } from "path";

const story = useStory<typeof inputModule, typeof outputModule>({
    dir: getESMPath(import.meta),
});

const mocks = [
    {
        title: "Many levels svg folder",
        filePath: inputDir,
        svgFileNames: [
            join(inputDir, 'fill-none.svg'),
            join(inputDir, 'rule-even-odd.svg'),
            join(inputDir, 'subdir1/icon1_20px.svg'),
            join(inputDir, 'subdir1/icon1_24px.svg'),
            join(inputDir, 'subdir1/subdir2/icon5_24px.svg'),
            join(inputDir, 'test_icon.svg'),
        ]
    },
];

export const stories = story.getStories({
    mocks,
    input: ({ filePath }) => ({ filePath }),
    output: ({ svgFileNames }) => ({ svgFileNames }),
});
