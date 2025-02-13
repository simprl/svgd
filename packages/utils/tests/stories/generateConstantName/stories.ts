import type * as inputModule from "./data";
import type * as outputModule from "./story";
import { getESMPath, useStory } from "codools";
import { NameFormats } from "@svgd/utils";

const story = useStory<typeof inputModule, typeof outputModule>({
  dir: getESMPath(import.meta),
});

const commonValues = {
  filePath: "src/icons/group1/subgroup1/size24/home.svg",
  baseDir: "src",
  template: "",
  format: NameFormats.camelCase,
}

const mocks = [
  {
    ...commonValues,
    title: "Default file name for home icon",
    constantName: "iconsGroup1Subgroup1Size24Home"
  },
  {
    ...commonValues,
    title: "Format PascalCase",
    format: NameFormats.PascalCase,
    constantName: "IconsGroup1Subgroup1Size24Home"
  },
  {
    ...commonValues,
    title: "Format Snake_case",
    format: NameFormats.snake_case,
    constantName: "icons_group1_subgroup1_size24_home"
  },
  {
    ...commonValues,
    title: "Format SCREAMING_SNAKE_CASE",
    format: NameFormats.SCREAMING_SNAKE_CASE,
    constantName: "ICONS_GROUP1_SUBGROUP1_SIZE24_HOME"
  },
  {
    ...commonValues,
    title: "Template {-2}{1,-3}{-1}",
    template: "{-2}{1,-3}{-1}",
    constantName: "size24Group1Subgroup1Home"
  },
  {
    ...commonValues,
    title: "Template {1,2}",
    template: "{1,2}",
    constantName: "group1Subgroup1"
  },
  {
    ...commonValues,
    title: "Template {0,0}",
    template: "{0,0}",
    constantName: "icons"
  },
  {
    ...commonValues,
    title: "Template {-1} (Negative index)",
    template: "{-1}",
    constantName: "home"
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ filePath, baseDir, template, format }) => ({ filePath, baseDir, template, format }),
  output: ({ constantName }) => ({ constantName }),
});
