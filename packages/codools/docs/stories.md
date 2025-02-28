## Get path of current file in esm project

### Use Case 1. With relativePath provided

#### Code:
```ts
import { getESMPath } from "codools";
const relativePath = "../otherFolder/file.txt";
const importMeta = import.meta;
export const esmPath = getESMPath(importMeta, relativePath);

```

#### Result:
```json
{
  "esmPath": "C:\\work\\svg\\svgd\\packages\\codools\\tests\\stories\\otherFolder\\file.txt"
}
```

### Use Case 2. Without relativePath provided - just return absolute pathe to directory of current file

#### Code:
```ts
import { getESMPath } from "codools";
const relativePath = "";
const importMeta = import.meta;
export const esmPath = getESMPath(importMeta, relativePath);

```

#### Result:
```json
{
  "esmPath": "C:\\work\\svg\\svgd\\packages\\codools\\tests\\stories\\getESMPath"
}
```

