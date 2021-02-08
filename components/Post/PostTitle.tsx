import React from "react";

interface Props {
  content: string;
}

export const PostTitle: React.FC<Props> = ({ content }) => {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {content}
    </h1>
  );
};
