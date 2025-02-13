import { getCodeMD, getESMPath, saveMD } from "codools";

saveMD(getESMPath(import.meta, "../docs/code.md"), getCodeMD(getESMPath(import.meta, "..")));
saveMD(getESMPath(import.meta, "../docs/tests.md"), getCodeMD(getESMPath(import.meta, ".."), ['node_modules/**', 'dist/**', 'src/**', 'scripts/**', 'build/**', '**/*.test.ts']));
