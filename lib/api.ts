import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "public", "static", "posts");

export const getAllPosts = (fields: string[] = []) => {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => getPostBySlug(slug, fields)); // TODO sort
};

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const fullPath = path.join(postsDirectory, slug, `README.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
};
