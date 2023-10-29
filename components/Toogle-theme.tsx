"use client";

import React from "react";
import { useTheme } from "next-themes";
import * as Toggle from "@radix-ui/react-toggle";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ToggleDemo = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Toggle.Root
      aria-label="Toggle italic"
      className={`flex h-[35px] w-[35px] items-center justify-center rounded text-base leading-4 hover:bg-gray-300/60`}
    >
      {theme === "light" && <SunIcon width={20} height={20} onClick={() => setTheme("dark")} />}

      {theme === "dark" && 
      <MoonIcon width={20} height={20}
      className="fill-white"
      onClick={() => setTheme("light")} />
      }
    </Toggle.Root>
  );
};

export default ToggleDemo;
