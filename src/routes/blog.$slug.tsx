import type { ComponentType } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CursorCollapseArticle } from "@/components/blog/CursorCollapseArticle";
import { StableSeamsArticle } from "@/components/blog/StableSeamsArticle";
import { TpmGuideArticle } from "@/components/blog/TpmGuideArticle";
import { getPost } from "@/content/blog";

const articles: Record<string, ComponentType> = {
  "why-your-cursor-codebase-collapses": CursorCollapseArticle,
  "stable-seams-strategy": StableSeamsArticle,
  "stop-prompting-for-features": TpmGuideArticle,
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} - Trellis VI Studio` },
      { name: "description", content: loaderData.excerpt },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.excerpt },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const Article = articles[post.slug];

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-6 sm:pt-10">
      <p className="text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <span aria-hidden="true"> · </span>
        <time dateTime={post.date}>{post.displayDate}</time>
      </p>
      {Article ? <Article /> : null}
    </main>
  );
}
