import React from "react";

interface Props {
  content: string;
}

export const SectionHeader: React.FC<Props> = ({ content }) => {
  return (
    <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
      {content}
    </h2>
  );
};
