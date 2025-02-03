import { getBaseConfig } from "../../eslintBaseConfig.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default getBaseConfig(path.dirname(fileURLToPath(import.meta.url)));
