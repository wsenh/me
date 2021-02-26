import remark from "remark";
import html from "remark-html";

const prism = require("remark-prism");

export const markdownToHtml = async (md: string) =>
  (await remark().use(html).use(prism).process(md)).toString();
