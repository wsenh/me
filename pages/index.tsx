import React from "react";
import { Intro } from "../components/Intro/Intro";
import { Container } from "../components/Layout/Container";
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
    <Container>
      <Intro />
      <FeaturedPost post={heroPost} />
      <MorePosts posts={morePosts} />
    </Container>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};

export default IndexPage;
