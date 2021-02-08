import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostProps } from "../pages/posts/[slug]";

const postsDirectory = path.join(process.cwd(), "public", "static", "posts");

export const getAllPosts = () => {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => b.timestamp - a.timestamp);
};

export const getPostBySlug = (slug: string) => {
  const fullPath = path.join(postsDirectory, slug, `README.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, slug, content } as PostProps;
};
