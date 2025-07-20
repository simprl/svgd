import type { CustomPlugin } from "svgo";
import type { XastNode } from "svgo/lib/types";

export const inlineUsePlugin: CustomPlugin = {
    name: 'inlineUse',
    fn: () => {
        const defsMap = new Map();
        function collectDefs(node: XastNode) {
            if (node.type === "element" || node.type === "root") {
                if (node.type === "element" && node.name === 'defs' && Array.isArray(node.children)) {
                    node.children = node.children.filter((defEl) => {
                        if(defEl.type !== "element" || defEl.name !== 'path') {
                            return true;
                        }
                        const {id, ...attributes} = defEl?.attributes ?? {};
                        if (id) {
                            defsMap.set(id, {...defEl, attributes });
                            return false;
                        }
                        return true;
                    });
                } else if (Array.isArray(node.children)) {
                    for (const child of node.children) {
                        collectDefs(child);
                    }
                }
            }

        }
        return {
            root: {
                enter(rootNode) {
                    collectDefs(rootNode);
                },
            },
            element: {
                enter(node, parentNode) {
                    if (node.name !== 'use') return;
                    const href = node.attributes.href || node.attributes['xlink:href'];
                    if (!href || !href.startsWith('#')) return;
                    const id = href.slice(1);
                    const defEl = defsMap.get(id);
                    if (!defEl) return;

                    // shallow clone of defEl + merge attributes
                    const clone = {
                        name: defEl.name,
                        type: defEl.type,
                        attributes: { ...defEl.attributes, ...node.attributes },
                        children: defEl.children
                    };

                    // replace <use> в parentNode.children
                    const idx = parentNode.children.indexOf(node);
                    if (idx >= 0) {
                        parentNode.children.splice(idx, 1, clone);
                    }
                }
            }
        };
    }
}
