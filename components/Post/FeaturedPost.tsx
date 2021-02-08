import React from "react";
import { PostProps } from "../../pages/posts/[slug]";
import { PostPreview } from "./PostPreview";

interface Props {
  post: PostProps;
}

export const FeaturedPost: React.FC<Props> = ({ post }) => {
  return (
    <section className="my-24">
      <PostPreview post={post} />
    </section>
  );
};
