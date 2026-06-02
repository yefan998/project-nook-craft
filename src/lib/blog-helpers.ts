export { BLOG_POSTS, getPost } from "./blog";
export type { BlogPost } from "./blog";

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
