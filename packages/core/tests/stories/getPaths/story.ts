import { getPaths } from "@svgo/core";
import { pathD } from "./data";

const attributes = getPaths(pathD);

export { attributes };
