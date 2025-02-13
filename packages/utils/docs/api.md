# Api: Generate Constant Name

## Use Case 1. Default file name for home icon

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "iconsGroup1Subgroup1Size24Home"
}
```

## Use Case 2. Format PascalCase

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "PascalCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "IconsGroup1Subgroup1Size24Home"
}
```

## Use Case 3. Format Snake_case

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "snake_case";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "icons_group1_subgroup1_size24_home"
}
```

## Use Case 4. Format SCREAMING_SNAKE_CASE

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
const format = "SCREAMING_SNAKE_CASE";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "ICONS_GROUP1_SUBGROUP1_SIZE24_HOME"
}
```

## Use Case 5. Template {-2}{1,-3}{-1}

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "size24Group1Subgroup1Home"
}
```

## Use Case 6. Template {1,2}

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "group1Subgroup1"
}
```

## Use Case 7. Template {0,0}

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "icons"
}
```

## Use Case 8. Template {-1} (Negative index)

### Code:
```ts
import { generateConstantName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
const format = "camelCase";
export const constantName = generateConstantName(filePath, baseDir, template, format);

```

### Result:
```json
{
  "constantName": "home"
}
```


---

# Api: Generate File Name

## Use Case 1. Default file name for home icon

### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

### Result:
```json
{
  "outputFileName": "icons/group1/subgroup1/size24/home"
}
```

## Use Case 2. Template {-2}{1,-3}{-1}

### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-2}{1,-3}{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

### Result:
```json
{
  "outputFileName": "size24/group1/subgroup1/home"
}
```

## Use Case 3. Template {1,2}

### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{1,2}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

### Result:
```json
{
  "outputFileName": "group1/subgroup1"
}
```

## Use Case 4. Template {0,0} (picking first segment)

### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{0,0}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

### Result:
```json
{
  "outputFileName": "icons"
}
```

## Use Case 5. Template {-1} (Negative index)

### Code:
```ts
import { generateFileName } from "@svgd/utils";
const filePath = "src/icons/group1/subgroup1/size24/home.svg";
const baseDir = "src";
const template = "{-1}";
export const outputFileName = generateFileName(filePath, baseDir, template);

```

### Result:
```json
{
  "outputFileName": "home"
}
```


---

# Api: Find svg files in a directory

## Use Case 1. Many levels svg folder

### Code:
```ts
import { getSvgFileNames } from "@svgd/utils";
const filePath = "C:\\work\\svg\\svgd\\packages\\utils\\tests\\stories\\svgFiles";
export const svgFileNames = getSvgFileNames(filePath);

```

### Result:
```json
{
  "svgFileNames": [
    "C:\\work\\svg\\svgd\\packages\\utils\\tests\\stories\\svgFiles\\test_icon.svg",
    "C:\\work\\svg\\svgd\\packages\\utils\\tests\\stories\\svgFiles\\subdir1\\icon1_20px.svg",
    "C:\\work\\svg\\svgd\\packages\\utils\\tests\\stories\\svgFiles\\subdir1\\icon1_24px.svg",
    "C:\\work\\svg\\svgd\\packages\\utils\\tests\\stories\\svgFiles\\subdir1\\subdir2\\icon5_24px.svg"
  ]
}
```

