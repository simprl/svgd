import type * as input from "./data";
import type * as output from "./story";
import { commonMocks } from 'tests/mocks/commonMocks';
import { useStory } from "codools";

const story = useStory<typeof input, typeof output>({ url: import.meta.url });

const mocks = [...commonMocks, {
    title: "Throw if incorrect svg",
    isThrow: true,
    svgInput: "ss",
    pathD: ""
}]

export const stories = story.getStories({
    mocks,
    input: ({ svgInput }) => ({ svgInput }),
    output: ({ pathD }) => ({ pathD })
});
