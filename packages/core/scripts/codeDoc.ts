import { getCodeMD, getESMDir, saveMD } from "code-tools";

saveMD("code.md", getCodeMD(getESMDir(import.meta.url, "..")));
