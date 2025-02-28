import {
  jsRowTemplate,
  jsRowTemplateWithJSDoc,
  dtsRowTemplate,
  mdRowTemplate,
  mdFileTemplate,
  htmlRowTemplate,
  htmlFileTemplate,
} from "src/templates";
import {
  templateProps,
} from "./data";

export const jsRow = jsRowTemplate(templateProps);
export const jsRowWithJSDoc = jsRowTemplateWithJSDoc(templateProps);
export const dtsRow = dtsRowTemplate(templateProps);
export const mdRow = mdRowTemplate(templateProps);
export const mdFile = mdFileTemplate(mdRow);
export const htmlRow = htmlRowTemplate(templateProps);
export const htmlFile = htmlFileTemplate(htmlRow);
