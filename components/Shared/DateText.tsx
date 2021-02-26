import React from "react";

interface Props {
  unixtimestamp: number;
}

export const DateText: React.FC<Props> = ({ unixtimestamp }) => {
  const dt = new Date(unixtimestamp * 1000);
  return (
    <time className="text-lg" dateTime={dt.toISOString()}>
      {dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
};
