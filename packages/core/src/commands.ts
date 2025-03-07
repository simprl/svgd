export interface PathAttributes {
    d: string;
    opacity?: string;
    "fill-opacity"?: string;
    "stroke-opacity"?: string;
    stroke?: string;
    fill?: string;
    "stroke-width"?: string;
    "fill-rule"?: string;
}

export interface Comand {
    code: string,
    attribute: keyof PathAttributes,
    regexp: string,
    toAttribute: (codeValue: string) => string,
    toCommand: (attributeValue: string) => string | null,
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
        code: "of",
        attribute: "fill-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "os",
        attribute: "stroke-opacity",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "f",
        attribute: "stroke",
        regexp: "[#0-9a-zA-Z]+",
        toAttribute: (codeValue) => {
            switch (codeValue) {
                case 'c': return 'currentColor';
                case 'n': return 'none';
                default: return codeValue;
            }
        },
        toCommand: (attributeValue) => {
            switch (attributeValue) {
                case 'currentColor': return 'c';
                case 'none': return 'n';
                default: return attributeValue;
            }
        },
    },
    {
        code: "F",
        attribute: "fill",
        regexp: "[#0-9a-zA-Z]+",
        toAttribute: (codeValue) => {
            switch (codeValue) {
                case 'c': return 'currentColor';
                case 'n': return 'none';
                default: return codeValue;
            }
        },
        toCommand: (attributeValue) => {
            switch (attributeValue) {
                case 'currentColor': return null;
                case 'none': return 'n';
                default: return attributeValue;
            }
        },
    },
    {
        code: "w",
        attribute: "stroke-width",
        regexp: "[\\d.]+",
        toAttribute: (codeValue) => codeValue,
        toCommand: (attributeValue) => attributeValue,
    },
    {
        code: "e",
        attribute: "fill-rule",
        regexp: "",
        toAttribute: () => 'evenodd',
        toCommand: (attributeValue) => attributeValue === 'evenodd' ? '' : null,
    }
]
