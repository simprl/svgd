import ts from 'typescript';

function transformImports(filePath: string, code: string, mockValues: Record<string, unknown>): string {
    const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.ESNext, true);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const transformer: ts.TransformerFactory<ts.Node> = (context) => {
        return (node) => {
            function visit(node: ts.Node): ts.Node | ts.Node[] {
                if (
                    ts.isImportDeclaration(node) &&
                    ts.isStringLiteral(node.moduleSpecifier) &&
                    node.moduleSpecifier.text === "./data"
                ) {
                    const importClause = node.importClause;
                    if (importClause && importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                        return importClause.namedBindings.elements.map((element) => {
                            const key = element.name.text;
                            const value = mockValues[key];
                            const initializer = createLiteralFromValue(key, value);
                            return ts.factory.createVariableStatement(
                                undefined,
                                ts.factory.createVariableDeclarationList(
                                    [
                                        ts.factory.createVariableDeclaration(
                                            ts.factory.createIdentifier(key),
                                            undefined,
                                            undefined,
                                            initializer
                                        ),
                                    ],
                                    ts.NodeFlags.Const
                                )
                            );
                        });
                    }
                }
                return ts.visitEachChild(node, visit, context);
            }
            const updatedNode = ts.visitNode(node, visit);
            return updatedNode as ts.SourceFile;
        };
    };

    const transformedSource = ts.transform(sourceFile, [transformer]);
    return  printer.printFile(transformedSource.transformed[0] as ts.SourceFile);
}

function createLiteralFromValue(key: string | undefined, value: unknown): ts.Expression {
    if (value === undefined) {
        return ts.factory.createStringLiteral("");
    }
    if (key === "importMeta") {
        return ts.factory.createMetaProperty(
            ts.SyntaxKind.ImportKeyword,
            ts.factory.createIdentifier("meta")
        )
    }
    if (typeof value === 'string') {
        return ts.factory.createStringLiteral(value);
    }
    if (typeof value === 'number') {
        return ts.factory.createNumericLiteral(value.toString());
    }
    if (typeof value === 'boolean') {
        return value ? ts.factory.createTrue() : ts.factory.createFalse();
    }
    if (value === null) {
        return ts.factory.createNull();
    }
    if (Array.isArray(value)) {
        const elements = value.map(item => createLiteralFromValue(undefined, item));
        return ts.factory.createArrayLiteralExpression(elements, false);
    }
    if (typeof value === 'object') {
        const properties = Object.entries(value).map(([key, val]) => {
            const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
            const keyName = isValidIdentifier
                ? ts.factory.createIdentifier(key)
                : ts.factory.createStringLiteral(key);
            return ts.factory.createPropertyAssignment(keyName, createLiteralFromValue(keyName.text, val));
        });
        return ts.factory.createObjectLiteralExpression(properties, true);
    }
    return ts.factory.createIdentifier("undefined");
}

export { transformImports };
