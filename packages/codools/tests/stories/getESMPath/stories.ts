import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const story = useStory<typeof inputModule, typeof outputModule>({
    dir: getESMPath(import.meta),
});

const computeExpected = (metaUrl: string, relativePath?: string): string => {
    const root = dirname(fileURLToPath(metaUrl));
    return relativePath ? resolve(root, relativePath) : root;
};

const mocks = [
    {
        title: "With relativePath provided",
        importMeta: { url: "file://Y:/myproject/scripts/getESMPath.ts" },
        relativePath: "../otherFolder/file.txt",
        esmPath: "Y:\\myproject\\otherFolder\\file.txt",
    },
    // {
    //     title: "Without relativePath provided",
    //     meta: { url: "file:///Users/test/project/src/utils/getESMPath.ts"},
    //     relativePath: undefined,
    //     esmPath: "",
    // }
];

export const stories = story.getStories({
    mocks,
    input: ({ importMeta, relativePath }) => ({ importMeta, relativePath }),
    output: ({ esmPath }) => ({ esmPath }),
});
