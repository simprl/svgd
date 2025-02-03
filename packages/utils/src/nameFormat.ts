import path from 'path';

export const NameFormats = {
    camelCase: 'camelCase',
    PascalCase: 'PascalCase',
    snake_case: 'snake_case',
    SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
} as const;

export type NameFormat = typeof NameFormats[keyof typeof NameFormats];

/**
 * Converts a string to PascalCase.
 */
function toPascalCase(str: string): string {
    // Example: "my-icon_name" -> "MyIconName"
    return str.replace(/(^|[-_ ])+./g, (match) =>
        match.charAt(match.length - 1).toUpperCase()
    );
}

/**
 * Converts a string to camelCase.
 */
function toCamelCase(str: string): string {
    // Example: "MyIconName" -> "myIconName"
    return toPascalCase(str).replace(/^[A-Z]/, (match) => match.toLowerCase());
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
            return elements.join(separator);
        })
        .replace(/{(-?\d+)}/g, (_match, indexStr) => {
            let idx = parseInt(indexStr, 10);
            if (idx < 0) {
                idx = array.length + idx;
            }
            return array[idx] !== undefined ? array[idx] : _match;
        });
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
