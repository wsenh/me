import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface Props {
  text?: string;
}

export const ThemeSwitch: React.FC<Props> = ({ text = "Dark Mode" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return (
    <div className="mb-3">
      <span className="text-gray-400 font-medium mr-2 align-middle">
        {text}
      </span>
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="Dark Mode"
          className="checked:bg-gray-800 checked:right-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition duration-500"
          checked={theme === "dark"}
          onChange={(e) => {
            if (!mounted) return;
            setTheme((e.target as HTMLInputElement).checked ? "dark" : "light");
          }}
        />
        <label
          htmlFor="Dark Mode"
          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};
