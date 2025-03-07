import { describe } from "vitest";
import { describeStories } from "codools/tests";
import { stories as generateStories } from "./generate/stories";
// import { stories as indexStories } from "./index/stories";
import { stories as parseCliArgsStories } from "./parseCliArgs/stories";
import { stories as templatesStories } from "./templates/stories";

describe("generateSvgConstants", () => describeStories(generateStories));
// describe("index CLI run", () => describeStories(indexStories));

describe("parseCliArgs", () => describeStories(parseCliArgsStories));
describe("templates", () => describeStories(templatesStories));
