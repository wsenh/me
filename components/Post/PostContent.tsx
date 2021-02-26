import React from "react";
import markdownStyles from "../../styles/markdown.module.css";

interface Props {
  content: string;
}

export const PostContent: React.FC<Props> = ({ content }) => {
  return (
    <div
      className={markdownStyles.markdown}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
