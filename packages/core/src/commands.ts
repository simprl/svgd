export interface PathAttributes {
    d: string;
    opacity?: string;
    "fill-opacity"?: string;
    stroke?: string;
    fill?: string;
    "stroke-width"?: string;
}

export interface Comand {
    code: string,
    attribute: keyof PathAttributes,
    regexp: string,
    toAttribute: (codeValue: string) => string,
    toCommand: (attributeValue: string) => string,
}

export const commands: Comand[] = [
    {
        code: "o",
        attribute: "opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "O",
        attribute: "fill-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "f",
        attribute: "stroke",
        regexp: "[0-9a-fA-F]+",
        toAttribute: (codeValue) => `#${codeValue}`,
        toCommand: (attributeValue) => attributeValue.replace(/^#/, ''),
    },
    {
        code: "F",
        attribute: "fill",
        regexp: "[0-9a-fA-F]+",
        toAttribute: (codeValue) => `#${codeValue}`,
        toCommand: (attributeValue) => attributeValue.replace(/^#/, ''),
    },
    {
        code: "w",
        attribute: "stroke-width",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    }
]
