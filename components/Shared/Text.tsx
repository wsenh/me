import React from "react";

interface Props {
  content: string;
}

export const Text: React.FC<Props> = ({ content }) => {
  return <p className="text-lg">{content}</p>;
};
