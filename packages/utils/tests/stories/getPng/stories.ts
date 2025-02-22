import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";
import { commonMocks } from "@svgd/mocks";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [
  ...commonMocks,
  {
    title: "Throw on invalid SVG for PNG conversion",
    isThrow: true,
    svgInput: "invalid_svg",
    pngBase64: ""
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ svgInput }) => ({ svgInput }),
  output: ({ pngBase64 }) => ({ pngBase64 })
});
