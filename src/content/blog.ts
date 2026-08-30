export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
};

export const posts: BlogPost[] = [
  {
    slug: "stop-prompting-for-features",
    title: "Stop prompting for features",
    excerpt:
      "The model will invent the schema, the library, and the query. A TPM brief stops the guessing. Here is the playbook.",
    date: "2026-08-30",
    displayDate: "30 August 2026",
  },
  {
    slug: "stable-seams-strategy",
    title: "The stable seams strategy",
    excerpt:
      "You asked for a small query fix. The model rewrote the router. Here is how to mark the files an assistant must not touch as a side effect.",
    date: "2026-08-30",
    displayDate: "30 August 2026",
  },
  {
    slug: "why-your-cursor-codebase-collapses",
    title: "Why your Cursor codebase collapses after 2,000 lines",
    excerpt:
      "The model did not get dumber. The chat you have been using as its memory did. Here is what the research says, and what to put in the repo instead.",
    date: "2026-08-30",
    displayDate: "30 August 2026",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
