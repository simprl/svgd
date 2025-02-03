import { walk } from "estree-walker";
import {
    Node,
    VariableDeclaration,
    Identifier,
    Literal,
    CallExpression,
    ObjectExpression,
    ExportSpecifier,
    SpreadElement,
    ExportNamedDeclaration,
    Property,
} from "estree";
import { DCollection, Declaration, Declarations } from "./types";


interface GetExportsProps {
    ast: Node;
    dList: DCollection;
}

/**
 * Extracts TypeScript declarations from the given AST and data map.
 * @param params - The parameters containing the AST and the data map.
 * @returns An array of export objects with names and associated info.
 */
export const getExports = ({ ast, dList }: GetExportsProps): Declarations => {
    const foundExports: Declarations = {};
    const declarations: Declarations = {};

    // First pass: Analyze variable declarations
    walk(ast, {
        enter(node) {
            if (node.type === "VariableDeclaration") {
                for (const decl of (node as VariableDeclaration).declarations) {
                    const result = analyzeDeclaration({
                        id: decl.id,
                        init: decl.init,
                        dCollection: dList,
                        declarations,
                    });
                    if (result) {
                        declarations[result.declName] = result.info;
                    }
                }
            }
        },
    });

    // Second pass: Analyze export declarations
    walk(ast, {
        enter(node) {
            if (node.type === "ExportNamedDeclaration") {
                const exportNamedDeclaration = node as ExportNamedDeclaration;
                if (
                    exportNamedDeclaration.specifiers &&
                    exportNamedDeclaration.specifiers.length > 0
                ) {
                    for (const spec of exportNamedDeclaration.specifiers as ExportSpecifier[]) {
                        const local = (spec.local as Identifier).name;
                        const exportedName = (spec.exported as Identifier).name;

                        if (local && exportedName) {
                            const info = declarations[local];
                            if (!info) {
                                console.log("!!! ExportNamedDeclaration in", exportedName, spec);
                            }
                            if (info) {
                                // Found an exported constant with associated info
                                foundExports[exportedName] = info;
                            }
                        }
                    }
                }
            }
        },
    });

    return foundExports;
};

/**
 * Interface for the parameters accepted by the analyzeDeclaration function.
 */
interface AnalyzeDeclarationParams {
    id: Node;
    init: Property["value"] | SpreadElement | null | undefined;
    dCollection: DCollection;
    declarations: Declarations;
}

/**
 * Interface for the result returned by the analyzeDeclaration function.
 */
interface AnalyzeDeclarationResult {
    declName: string;
    info: Declaration;
}

/**
 * Recursively analyzes a declaration node to extract relevant information.
 * @param params - The parameters for analyzing the declaration.
 * @returns An object containing the declaration name and its associated info, or undefined if not applicable.
 */
function analyzeDeclaration({ id, init, dCollection, declarations }: AnalyzeDeclarationParams): AnalyzeDeclarationResult | undefined {

    // Ensure the id is an Identifier
    if (id.type !== "Identifier") {
        return;
    }

    const declName = (id as Identifier).name;

    // Handle initialization with a string literal
    if (
        init &&
        init.type === "Literal" &&
        typeof (init as Literal).value === "string"
    ) {
        const literalValue = (init as Literal).value as string;
        const info = dCollection[literalValue];
        if (info) {
            return { declName, info };
        }
        return;
    }

    // Handle initialization with another identifier
    if (init && init.type === "Identifier") {
        const localName = (init as Identifier).name;
        const local = declarations[localName];
        if (local) {
            return { declName, info: local };
        }
        return;
    }

    // Handle Object.freeze calls
    if (
        init &&
        init.type === "CallExpression" &&
        isObjectMethodCall(init, "freeze")
    ) {
        const args = (init as CallExpression).arguments;
        if (args.length > 0) {
            return analyzeDeclaration({
                id,
                init: args[0],
                dCollection,
                declarations,
            });
        }
    }

    // Handle Object.defineProperty calls
    if (
        init &&
        init.type === "CallExpression" &&
        isObjectMethodCall(init, "defineProperty")
    ) {
        const args = (init as CallExpression).arguments;
        if (args.length > 0) {
            return analyzeDeclaration({
                id,
                init: args[0],
                dCollection,
                declarations,
            });
        }
    }

    // Handle Object expressions
    if (init && init.type === "ObjectExpression") {
        const entries: [string, Declaration][] = [];
        for (const prop of (init as ObjectExpression).properties) {
            if (prop.type === "Property") {
                const key = getPropertyName(prop.key);
                if (!key) continue;

                const value = prop.value;
                const result = analyzeDeclaration({
                    id: { type: "Identifier", name: key } as Identifier,
                    init: value,
                    dCollection,
                    declarations,
                });

                if (result) {
                    entries.push([result.declName, result.info]);
                }
            }
        }

        if (entries.length > 0) {
            return {
                declName,
                info: { children: Object.fromEntries(entries) },
            };
        }
    }

    return;
}

/**
 * Determines if a CallExpression is a call to a specific Object method.
 * @param expr - The CallExpression node.
 * @param methodName - The name of the method to check for (e.g., 'freeze').
 * @returns True if the expression is a call to Object.methodName, otherwise false.
 */
function isObjectMethodCall(expr: CallExpression, methodName: string): boolean {
    return (
        expr.callee.type === "MemberExpression" &&
        expr.callee.object.type === "Identifier" &&
        expr.callee.object.name === "Object" &&
        expr.callee.property.type === "Identifier" &&
        expr.callee.property.name === methodName
    );
}

/**
 * Retrieves the name of a property key, handling different key types.
 * @param key - The key node of a property.
 * @returns The property name as a string, or undefined if it cannot be determined.
 */
function getPropertyName(key: Property["key"]): string | undefined {
    if (key.type === "Identifier") {
        return key.name;
    }
    if (key.type === "Literal" && typeof key.value === "string") {
        return key.value;
    }
    return;
}


