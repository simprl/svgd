import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";
import { commonMocks } from "@svgd/mocks";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

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
