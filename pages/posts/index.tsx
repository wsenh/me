import React from "react";
import { PostList } from "../../components/Post/PostList";
import { HomeButton } from "../../components/Shared/HomeButton";
import { getAllPosts } from "../../lib/api";
import { PostProps } from "./[slug]";

interface Props {
  posts: PostProps[];
}

const IndexPage: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <HomeButton />
      <PostList posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default IndexPage;
