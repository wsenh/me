import React from "react";
import { PostProps } from "../../pages/posts/[slug]";
import { PostSummary } from "./PostSummary";

interface Props {
  posts: PostProps[];
}

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <ul key={post.slug}>
          <PostSummary post={post} />
        </ul>
      ))}
    </div>
  );
};
