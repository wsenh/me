import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  slug: string;
}

export const ListTitle: React.FC<Props> = ({ title, slug }) => {
  return (
    <h2 className="text-4xl lg:text-6xl leading-tight hover:underline">
      <Link as={`/posts/${slug}`} href="/posts/[slug]" passHref>
        <a>{title}</a>
      </Link>
    </h2>
  );
};
