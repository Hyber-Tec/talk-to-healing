"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Links to a section of the home page from anywhere on the site.
 * On the home page it is a plain hash link, so smooth scrolling handles it;
 * on other pages it navigates home and lands on the section.
 */
export function SectionLink({
  hash,
  children,
  ...props
}: { hash: `#${string}` } & Omit<React.ComponentProps<"a">, "href">) {
  const onHome = usePathname() === "/";
  if (onHome) {
    return (
      <a href={hash} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/${hash}`} {...props}>
      {children}
    </Link>
  );
}
