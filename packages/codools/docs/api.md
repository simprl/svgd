# Api: getSvgoConfig

## Use Case 1. With relativePath provided

### Code:
```ts
import { getESMPath } from "codools";
const relativePath = "../otherFolder/file.txt";
const importMeta = import.meta;
export const esmPath = getESMPath(importMeta, relativePath);

```

### Result:
```json
{
  "esmPath": "Y:\\myproject\\otherFolder\\file.txt"
}
```

