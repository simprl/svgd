import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const story = useStory<typeof inputModule, typeof outputModule>({
    dir: getESMPath(import.meta),
});

const mocks = [
    {
        title: "With relativePath provided",
        importMeta: import.meta,
        relativePath: "../otherFolder/file.txt",
        esmPath: resolve(dirname(fileURLToPath(import.meta.url)), "../otherFolder/file.txt"),
    },
    {
        title: "Without relativePath provided - just return absolute pathe to directory of current file",
        importMeta: import.meta,
        relativePath: undefined,
        esmPath: dirname(fileURLToPath(import.meta.url)),
    }
];

export const stories = story.getStories({
    mocks,
    input: ({ importMeta, relativePath }) => ({ importMeta, relativePath }),
    output: ({ esmPath }) => ({ esmPath }),
});
