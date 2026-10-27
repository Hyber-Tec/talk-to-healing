/**
 * Prefixes a file in `public/` with the deploy's base path.
 * next/image does not add `basePath` to `src` on its own, so every public asset goes through here
 * (the GitHub Pages preview serves the site from a sub-path; the production domain uses none).
 */
export function asset(path: `/${string}`) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
