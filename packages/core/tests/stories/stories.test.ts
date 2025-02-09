import { describe } from "vitest";
import { stories as getPaths } from "./getPaths/stories"
import { stories as getSvg } from "tests/stories/getSvg/stories"
import { stories as getSvgoConfig } from "tests/stories/getSvgoConfig/stories"
import { describeStories } from "code-tools/tests";

describe("getSvgoConfig", () => describeStories(getSvgoConfig))
describe("getPaths", () => describeStories(getPaths))
describe("getSvg", () => describeStories(getSvg))
