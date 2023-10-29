"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ToggleDemo from "./Toogle-theme";

import { FaceIcon } from "@radix-ui/react-icons"

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const Navbar = () => {
  const currentPathName = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><FaceIcon width={30} height={30} /></Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`${
                link.href === currentPathName
                  ? "text-zinc-900"
                  : "text-zinc-500 "
              }hover:text-zinc-800 transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ToggleDemo />
    </nav>
  );
};

export default Navbar;
