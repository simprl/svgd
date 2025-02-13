import { getCodeMD, getESMPath, saveMD } from "codools";

saveMD(getESMPath(import.meta, "../docs/code.md"), getCodeMD(getESMPath(import.meta, "..")));
