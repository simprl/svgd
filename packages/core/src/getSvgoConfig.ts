import { defaultConfig } from "./defaultConfig";
import type { XastChild, XastRoot } from "svgo/lib/types";
import type { Config, CustomPlugin } from "svgo";
import { resizePlugin } from "./resizePlugin";
import { inlineUsePlugin } from "./inlineUsePlugin";
import { commands } from "./commands";
import { moveGroupOpacityToElementsPlugin } from "./moveGroupOpacityToElementsPlugin";

export const getSvgoConfig = (config = defaultConfig): Config => {
    const plugins = (config.svgo.plugins ?? []);
    const pluginsByColor = config.colors
        ? plugins
        : plugins.map((plugin) => (typeof plugin === "object" && plugin.name === "convertColors") ? {
            ...plugin,
            params: {
                currentColor: true
            }
        } : plugin);
    return {
        ...config.svgo,
        plugins: [
            inlineUsePlugin,
            moveGroupOpacityToElementsPlugin,
            resizePlugin(config.resize),
            ...pluginsByColor,
            extractPathDPlugin(),
        ],
    };
}

export const extractPathDPlugin = (): CustomPlugin => ({
    name: 'extractPathD',
    fn: (ast: XastRoot) => {
        const collectPathsContext: CollectPathsContext = {
            paths: [],
            wasCommand: false,
        }
        collectPaths(ast, collectPathsContext);
        ast.children = [{
            type: "text",
            value: collectPathsContext.paths.join(' ')
        }];
        return null;
    },
});

interface CollectPathsContext {
    paths: string[];
    wasCommand: boolean;
}

type CollectableAttribute = typeof commands[number]["attribute"];
type InheritedAttributes = Partial<Record<CollectableAttribute, string>>;

const collectPaths = (
    node: XastChild | XastRoot,
    context: CollectPathsContext,
    inheritedAttributes: InheritedAttributes = {},
) => {
    let nextInheritedAttributes = inheritedAttributes;

    if (
        node.type === 'element' &&
        !['path', 'g', 'svg', 'title'].includes(node.name)
    ) {
        throw new Error(`[SVGD ERROR] svg has other tag "${node.name}"`);
    }
    if (
        node.type === 'element' &&
        node.name === 'path' &&
        node.attributes.d
    ) {
        const effectiveAttributes = {
            ...inheritedAttributes,
            ...node.attributes,
        };
        const d = node.attributes.d;
        const commandsArray: string[] = [];

        commands.forEach(({ code, toCommand, attribute }) => {
            if (attribute in effectiveAttributes) {
                const commandValue = toCommand(effectiveAttributes[attribute] as string);
                if (commandValue !== null) {
                    commandsArray.push(`${code}${commandValue}`);
                }
            }
        });

        if (commandsArray.length) {
            context.wasCommand = true;
            context.paths.push(...commandsArray);
        } else if (context.wasCommand) {
            context.paths.push("o1");
        }
        context.paths.push(d);
    }

    if (
        node.type === "element" &&
        ['g', 'svg'].includes(node.name)
    ) {
        nextInheritedAttributes = {
            ...inheritedAttributes,
        };
        commands.forEach(({ attribute }) => {
            if (node.attributes[attribute] !== undefined) {
                nextInheritedAttributes[attribute] = node.attributes[attribute];
            }
        });
    }

    if ("children" in node) {
        node.children.forEach((node) => collectPaths(node, context, nextInheritedAttributes));
    }
};
