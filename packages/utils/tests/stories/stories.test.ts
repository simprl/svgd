import { describe } from "vitest";
import { stories as generateConstantNameStories } from "./generateConstantName/stories";
import { stories as generateFileNameStories } from "./generateFileName/stories";
import { stories as getSvgFileNamesStories } from "./getSvgFileNames/stories";
import { describeStories } from "codools/tests";

describe("generateConstantName", () => {
  describeStories(generateConstantNameStories);
});

describe("generateFileName", () => {
  describeStories(generateFileNameStories);
});

describe("getSvgFileNames", () => {
  describeStories(getSvgFileNamesStories);
});
