import * as ts from 'typescript';
import { getSvg } from "@svgd/core";
import { getPng } from "../png";
import { Declaration, Declarations } from "./types";

export async function getDTS(declarations: Declarations): Promise<string> {
    const generateType = async (info: Declaration): Promise<ts.TypeNode> => {
        if ("d" in info) {
            return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
        }
        if ("children" in info) {
            const members: Promise<ts.TypeElement>[] = Object.entries(info.children).map(async ([key, child]) => {
                const typeNode = await generateType(child);
                const jsDocComment = await generateJsDoc(child);

                const propertySignature = ts.factory.createPropertySignature(
                    undefined,
                    key,
                    undefined,
                    typeNode
                );

                if (jsDocComment) {
                    ts.addSyntheticLeadingComment(
                        propertySignature,
                        ts.SyntaxKind.MultiLineCommentTrivia,
                        jsDocComment,
                        true
                    );
                }

                return propertySignature;
            });
            return ts.factory.createTypeLiteralNode(await Promise.all(members));
        }
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    };

    const textToComment = (text: string): string => text.replace(/\n/g, '\n * ');

    const generateJsDoc = async (info: Declaration): Promise<string | undefined> => {
        if ("d" in info) {
            const text = `![](data:image/png;base64,${await getPng(getSvg(info.d))})`;
            return `*
 * ${textToComment(text)}
 `;
        }
        return undefined;
    };

    const statements: Promise<ts.Statement>[] = Object.entries(declarations).map(async ([name, info]) => {
        const type = await generateType(info);
        const jsDocComment = await generateJsDoc(info);

        // Create the variable declaration
        const varDeclaration = ts.factory.createVariableDeclaration(name, undefined, type, undefined);

        // Create the variable statement with export modifier
        const varStatement = ts.factory.createVariableStatement(
            [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            ts.factory.createVariableDeclarationList([varDeclaration], ts.NodeFlags.Const)
        );

        // If there's a JSDoc comment, add it as a leading comment
        if (jsDocComment) {
            ts.addSyntheticLeadingComment(
                varStatement,
                ts.SyntaxKind.MultiLineCommentTrivia,
                jsDocComment,
                true
            );
        }

        return varStatement;
    });

    const sourceFile = ts.factory.createSourceFile(
        await Promise.all(statements),
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None
    );

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printFile(sourceFile);
}
