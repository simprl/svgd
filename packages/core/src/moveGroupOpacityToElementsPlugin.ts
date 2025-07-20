import type { CustomPlugin } from "svgo";
import { XastElement } from "svgo/lib/types";

export const name = 'moveGroupAttrsToElems';
export const description =
    'moves some group attributes to the content elements';

const opacityAttibutes = ["opacity", "fill-opacity", "stroke-opacity"];

export const moveGroupOpacityToElementsPlugin: CustomPlugin = {
    name: 'inlineUse',
    fn: () => {
        return {
            element: {
                enter: (node) => {
                    if (
                        node.name === 'g' &&
                        node.children.length !== 0
                    ) {

                        const mergers = opacityAttibutes
                            .map((opacityAttibute) => getMergeOpacity(node, opacityAttibute))
                            .filter(Boolean) as Array<(node: XastElement) => void>;

                        for (const child of node.children) {

                            if (child.type === 'element') {
                                mergers.forEach((merge)=> merge(child));
                            }
                        }

                        opacityAttibutes.forEach((opacityAttibute)=>{
                            delete node.attributes[opacityAttibute];
                        })
                    }
                },
            },
        };
    }
}

function getMergeOpacity(parent: XastElement, attributeName: string) {
    if (!(attributeName in parent.attributes)) return null;
    const parentValue = parent.attributes[attributeName];
    const parsedParentValue = Number.parseFloat(parentValue);
    return (node: XastElement) => {
        if (node.type === 'element') {
            const value = node.attributes[attributeName];
            node.attributes[attributeName] = (value !== null && value !== undefined)
                ? String(Number.parseFloat(node.attributes[attributeName]) * parsedParentValue)
                : parentValue;

        }
    }
}
