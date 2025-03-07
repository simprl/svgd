import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from '@svgd/mocks';
import { getESMPath, useStory } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [...commonMocks, {
    title: "Throw if incorrect svg",
    isThrow: true,
    svgInput: "ss",
    pathD: "",
    config: undefined
}]

export const stories = story.getStories({
    mocks,
    input: ({ svgInput, config }) => ({ svgInput, config }),
    output: ({ pathD }) => ({ pathD })
});
