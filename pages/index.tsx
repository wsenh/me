import React from "react";
import { Intro } from "../components/Intro/Intro";
import { FeaturedPost } from "../components/Post/FeaturedPost";
import { MorePosts } from "../components/Post/MorePosts";
import { getAllPosts } from "../lib/api";
import { PostProps } from "./posts/[slug]";

interface Props {
  posts: PostProps[];
}

const IndexPage: React.FC<Props> = ({ posts }) => {
  const heroPost = posts[0];
  const morePosts = posts.slice(1, 3);

  return (
    <>
      <Intro />
      <FeaturedPost post={heroPost} />
      <MorePosts posts={morePosts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default IndexPage;
