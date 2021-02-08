import remark from "remark";
import html from "remark-html";

export const markdownToHtml = async (md: string) =>
  (await remark().use(html).process(md)).toString();
