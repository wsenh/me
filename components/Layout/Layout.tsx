import React from "react";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
      {children}
    </div>
  );
};
