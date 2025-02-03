export type DInfo = {
    d: string;
    filePath: string;
}

export type DCollection = Record<string, DInfo>;

export type Declarations = Record<string, Declaration>;

export type WithChildrenDeclarations = {
    children: Declarations;
}

export type Declaration = DInfo | WithChildrenDeclarations;
