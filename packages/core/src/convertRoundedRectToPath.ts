type XastElement = {
    name: string;
    attributes?: Record<string, string>;
};

type Visitor = {
    element?: {
        enter?: (node: XastElement) => void;
    };
};

type SvgoCustomPlugin = {
    name: string;
    description: string;
    fn: () => Visitor;
};

export const convertRoundedRectToPath: SvgoCustomPlugin = {
    name: 'convertRoundedRectToPath',
    description: 'Convert only rounded <rect> elements to <path>.',
    fn: () => {
        return {
            element: {
                enter: (node: XastElement) => {
                    if (node.name !== 'rect' || node.attributes == null) {
                        return;
                    }

                    const attrs = node.attributes;

                    const x = toNumber(attrs.x, 0);
                    const y = toNumber(attrs.y, 0);
                    const width = toNumber(attrs.width, null);
                    const height = toNumber(attrs.height, null);

                    if (
                        width == null ||
                        height == null ||
                        !Number.isFinite(width) ||
                        !Number.isFinite(height) ||
                        width <= 0 ||
                        height <= 0
                    ) {
                        return;
                    }

                    const hasRx = attrs.rx != null;
                    const hasRy = attrs.ry != null;

                    // Only process rects that explicitly have rounded corners.
                    if (!hasRx && !hasRy) {
                        return;
                    }

                    let rx = hasRx ? toNumber(attrs.rx, 0) : null;
                    let ry = hasRy ? toNumber(attrs.ry, 0) : null;

                    // SVG behavior:
                    // - if only rx is set, ry = rx
                    // - if only ry is set, rx = ry
                    if (rx != null && ry == null) {
                        ry = rx;
                    } else if (rx == null && ry != null) {
                        rx = ry;
                    }

                    rx = clamp(rx ?? 0, 0, width / 2);
                    ry = clamp(ry ?? 0, 0, height / 2);

                    // Skip non-rounded rects, including rx="0"/ry="0".
                    if (rx <= 0 && ry <= 0) {
                        return;
                    }

                    const d = buildRoundedRectPath(x, y, width, height, rx, ry);

                    node.name = 'path';
                    node.attributes = {
                        ...attrs,
                        d,
                    };

                    delete node.attributes.x;
                    delete node.attributes.y;
                    delete node.attributes.width;
                    delete node.attributes.height;
                    delete node.attributes.rx;
                    delete node.attributes.ry;
                },
            },
        };
    },
};

function toNumber<Fallback extends number | null>(value: string | undefined, fallback: Fallback): number | Fallback {
    if (value == null) {
        return fallback;
    }

    const num = Number.parseFloat(String(value).trim());
    return Number.isFinite(num) ? num : fallback;
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

function buildRoundedRectPath(
    x: number,
    y: number,
    width: number,
    height: number,
    rx: number,
    ry: number,
): string {
    const x2 = x + width;
    const y2 = y + height;

    return [
        'M', fmt(x + rx), fmt(y),
        'H', fmt(x2 - rx),
        'A', fmt(rx), fmt(ry), '0', '0', '1', fmt(x2), fmt(y + ry),
        'V', fmt(y2 - ry),
        'A', fmt(rx), fmt(ry), '0', '0', '1', fmt(x2 - rx), fmt(y2),
        'H', fmt(x + rx),
        'A', fmt(rx), fmt(ry), '0', '0', '1', fmt(x), fmt(y2 - ry),
        'V', fmt(y + ry),
        'A', fmt(rx), fmt(ry), '0', '0', '1', fmt(x + rx), fmt(y),
        'Z',
    ].join(' ');
}

function fmt(value: number): string {
    return Number.parseFloat(value.toFixed(6)).toString();
}