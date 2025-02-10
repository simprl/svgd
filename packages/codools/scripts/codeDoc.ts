import { getCodeMD, getESMDir, saveMD } from "codools";

saveMD("code.md", getCodeMD(getESMDir(import.meta.url, "..")));
