import React from "react";
import { PostProps } from "../../pages/posts/[slug]";
import { CoverImage } from "../Shared/CoverImage";
import { DateText } from "../Shared/DateText";
import { ListTitle } from "../Shared/ListTitle";
import { Text } from "../Shared/Text";

interface Props {
  post: PostProps;
  vert?: boolean;
}

export const PostPreview: React.FC<Props> = ({ post, vert = false }) => {
  return (
    <div>
      <CoverImage
        src={post.coverImage}
        href="/posts/[slug]"
        as={`/posts/${post.slug}`}
        desc={post.title}
      />
      <div
        className={`mt-4 md:mt-12 md:grid ${
          vert ? "" : "md:grid-cols-2"
        } md:gap-x-16 lg:gap-x-8`}
      >
        <div className={`mb-2 ${vert ? "" : "md:mb-0"}`}>
          <div className={"mb-2 md:mb-4"}>
            <ListTitle title={post.title} slug={post.slug} />
          </div>
          <DateText unixtimestamp={post.timestamp} />
        </div>
        <div>
          <Text content={post.excerpt} />
        </div>
      </div>
    </div>
  );
};
