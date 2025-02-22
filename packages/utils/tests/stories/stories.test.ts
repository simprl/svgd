import { describe } from "vitest";
import { stories as generateConstantNameStories } from "./generateConstantName/stories";
import { stories as generateFileNameStories } from "./generateFileName/stories";
import { stories as getSvgFileNamesStories } from "./getSvgFileNames/stories";
import { stories as parseSvgStories } from "./parseSvg/stories";
import { stories as getPngStories } from "./getPng/stories";
import { describeStories } from "codools/tests";

describe("generateConstantName", () => describeStories(generateConstantNameStories));
describe("generateFileName", () => describeStories(generateFileNameStories));
describe("getSvgFileNames", () => describeStories(getSvgFileNamesStories));
describe("parseSvg", () => describeStories(parseSvgStories));
describe("getPng", () => describeStories(getPngStories));
