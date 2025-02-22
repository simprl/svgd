import { describe } from "vitest";
import { stories as getESMPathStories } from "tests/stories/getESMPath/stories"
import { describeStories } from "codools/tests";

describe("getESMPathStories", () => describeStories(getESMPathStories))

