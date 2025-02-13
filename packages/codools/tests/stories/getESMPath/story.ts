import { getESMPath } from "codools";
import { relativePath, importMeta } from "./data";

export const esmPath = getESMPath(importMeta, relativePath);
