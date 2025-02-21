import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [
  {
    title: "Valid PNG conversion",
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<circle cx="32" cy="32" r="30" fill="red"/>
</svg>`,
    pngBase64: "VALID_PNG_BASE64_OUTPUT"
  },
  {
    title: "Throw on invalid SVG for PNG conversion",
    isThrow: true,
    svgContent: "invalid_svg",
    pngBase64: ""
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ svgContent }) => ({ svgContent }),
  output: ({ pngBase64 }) => ({ pngBase64 })
});
