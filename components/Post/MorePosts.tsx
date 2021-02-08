import React from "react";
import { PostProps } from "../../pages/posts/[slug]";
import { FlatButton } from "../Shared/FlatButton";
import { SectionHeader } from "../Shared/SectionHeader";
import { PostPreview } from "./PostPreview";

interface Props {
  posts: PostProps[];
}

export const MorePosts: React.FC<Props> = ({ posts }) => {
  const t =
    posts.length > 0 ? (
      <div className="my-12 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        {posts.map((post) => (
          <PostPreview post={post} />
        ))}
      </div>
    ) : (
      <></>
    );

  return posts.length === 0 ? (
    <></>
  ) : (
    <section className="my-24">
      <SectionHeader content="More Writings" />
      <div className="relative my-12 grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32">
        {posts.map((post) => (
          <PostPreview post={post} vert />
        ))}
      </div>
      <div className="text-center">
        <FlatButton href="/posts">More</FlatButton>
      </div>
    </section>
  );
};
