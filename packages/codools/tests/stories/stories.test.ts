import { describe } from "vitest";
import { stories as getSvgoConfig } from "tests/stories/getESMPath/stories"
import { describeStories } from "codools/tests";

describe("getSvgoConfig", () => describeStories(getSvgoConfig))

