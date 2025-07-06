import path from 'path';

export const NameFormats = {
    camelCase: 'camelCase',
    PascalCase: 'PascalCase',
    snake_case: 'snake_case',
    SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
    material: 'material',
} as const;

export type NameFormat = typeof NameFormats[keyof typeof NameFormats];

/**
 * Converts a string to PascalCase.
 */
function toPascalCase(str: string): string {
    // Example: "my-icon_name" -> "MyIconName"
    return str.replace(/(^|[-_ ])+./g, (match) =>
        match.charAt(match.length - 1).toUpperCase()
    ).replace(/[-_ ]/g, "");
}

/**
 * Converts a string to camelCase.
 */
function toCamelCase(str: string): string {
    // Example: "MyIconName" -> "myIconName"
    return toPascalCase(str).replace(/^[A-Z]/, (match) => match.toLowerCase());
}

const singleDigitNumbers = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
];

const twoDigitNumbers1 = [
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
];

function toMaterialName(str: string): string {
    let fileName = str
        .replace(/_([0-9]+)px$/, '')
        .replace(/(^.)|(_)(.)/g, (_m, p1, _p2, p3) => (p1 || p3).toUpperCase());

    if (fileName.startsWith('3dRotation')) {
        return `ThreeD${fileName.slice(2)}`;
    }

    if (fileName.startsWith('3p')) {
        return `ThreeP${fileName.slice(2)}`;
    }

    if (fileName.startsWith('30fps')) {
        return `ThirtyFps${fileName.slice(5)}`;
    }
    if (fileName.startsWith('60fps')) {
        return `SixtyFps${fileName.slice(5)}`;
    }
    if (fileName.startsWith('360')) {
        return `ThreeSixty${fileName.slice(3)}`;
    }

    if (/\dFt/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}${fileName.slice(1)}`;
    }

    if (/\dk/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}K${fileName.slice(2)}`;
    }

    if (/^\dmp/.test(fileName)) {
        return `${singleDigitNumbers[Number(fileName[0])] ?? fileName[0]}M${fileName.slice(2)}`;
    }
    if (/^1\dmp/.test(fileName)) {
        return `${twoDigitNumbers1[Number(fileName[1])] ?? fileName[1]}M${fileName.slice(3)}`;
    }
    if (/^2\dmp/.test(fileName)) {
        return `Twenty${singleDigitNumbers[Number(fileName[1])] ?? fileName[1]}M${fileName.slice(3)}`;
    }

    if (fileName.startsWith('1x')) {
        return `TimesOne${fileName.slice(2)}`;
    }

    if (fileName.startsWith('3g')) {
        return `ThreeG${fileName.slice(2)}`;
    }
    if (fileName.startsWith('4g')) {
        return `FourG${fileName.slice(2)}`;
    }
    if (fileName.startsWith('5g')) {
        return `FiveG${fileName.slice(2)}`;
    }

    if (/^1\d/.test(fileName)) {
        return `${twoDigitNumbers1[Number(fileName[1])] ?? fileName[1]}${fileName.slice(2)}`;
    }

    return fileName;
}

/**
 * Applies a range template like {0}, {1,-1}, etc. to an array of strings.
 */
function formatWithTemplateAndRange(
    array: string[],
    template: string,
    separator = '_'
): string {
    if (!template) {
        return array.join(separator);
    }
    return template
        .replace(/{(-?\d+),(-?\d+)}/g, (_match, startStr, endStr) => {
            const startIndex = parseInt(startStr, 10);
            const endIndex = parseInt(endStr, 10);
            const elements = array.slice(
                startIndex,
                endIndex === -1 ? undefined : endIndex + 1
            );
            return `${separator}${elements.join(separator)}${separator}`;
        })
        .replace(/{(-?\d+)}/g, (_match, indexStr) => {
            let idx = parseInt(indexStr, 10);
            if (idx < 0) {
                idx = array.length + idx;
            }
            return array[idx] !== undefined ? `${separator}${array[idx]}${separator}` : separator;
        })
        .replace(new RegExp(`[${separator}]+`, 'g'), separator)
        .replace(new RegExp(`^[${separator}]|[${separator}]$`, 'g'), "");
}

/**
 * Builds the constant name from the SVG path, based on a template and a format.
 */
export function generateConstantName(
    filePath: string,
    baseDir: string,
    template: string,
    format: NameFormat
): string {
    const relativePath = path.relative(baseDir, filePath);
    const nameWithoutExt = relativePath.slice(
        0,
        -path.extname(relativePath).length
    );

    const splitted = nameWithoutExt.split(path.sep);
    const formatted = formatWithTemplateAndRange(splitted, template);

    switch (format) {
        case NameFormats.camelCase:
            return toCamelCase(formatted);
        case NameFormats.PascalCase:
            return toPascalCase(formatted);
        case NameFormats.snake_case:
            return formatted.replace(/[-\s]+/g, '_').toLowerCase();
        case NameFormats.SCREAMING_SNAKE_CASE:
            return formatted.replace(/[-\s]+/g, '_').toUpperCase();
        case NameFormats.material:
            return toMaterialName(formatted);
        default:
            return formatted;
    }
}

/**
 * Builds the final output file name, based on a template and directory structure.
 */
export function generateFileName(filePath: string, baseDir: string, template: string) {
    const relativePath = path.relative(baseDir, filePath);
    const nameWithoutExt = relativePath.slice(
        0,
        -path.extname(relativePath).length
    );

    const splitted = nameWithoutExt.split(path.sep);
    return formatWithTemplateAndRange(splitted, template, '/');
}
