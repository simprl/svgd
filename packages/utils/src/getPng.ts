import sharp from "sharp";

export const getPng = async (svgContent: string, width = 64, height = width) => {
    const pngBuffer = await sharp(Buffer.from(svgContent))
        .resize(width, height)
        .png()
        .toBuffer();
    return pngBuffer.toString('base64');
}
