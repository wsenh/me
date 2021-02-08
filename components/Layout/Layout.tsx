import React from "react";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col">
      {children}
    </div>
  );
};
