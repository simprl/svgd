import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const mocks = [
  {
    title: "Valid SVG optimization",
    svgInput: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>`,
    optimizedSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>`
  },
  {
    title: "Throw on invalid SVG",
    isThrow: true,
    svgInput: "<svg></svg>",
    optimizedSvg: ""
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ svgInput }) => ({ svgInput }),
  output: ({ optimizedSvg }) => ({ optimizedSvg })
});
