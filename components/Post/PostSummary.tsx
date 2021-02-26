import React from "react";
import { PostProps } from "../../pages/posts/[slug]";
import { DateText } from "../Shared/DateText";
import { ListTitle } from "../Shared/ListTitle";
import { Thumbnail } from "../Shared/Thumbnail";

interface Props {
  post: PostProps;
}

export const PostSummary: React.FC<Props> = ({ post }) => {
  return (
    <li className="flex flex-row my-12">
      <div className="mr-12 sm:block hidden">
        <Thumbnail
          width={128}
          height={128}
          src={post.coverImage}
          href="/posts/[slug]"
          as={`/posts/${post.slug}`}
          desc={post.title}
        />
      </div>
      <div>
        <ListTitle slug={post.slug} title={post.title} />
        <div className="mt-4">
          <DateText unixtimestamp={post.timestamp} />
        </div>
      </div>
    </li>
  );
};
