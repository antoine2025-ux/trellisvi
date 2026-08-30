import { Link, createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content/blog";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
      <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl md:text-6xl">Blog</h1>
      <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">
        Notes on AI-assisted systems architecture, context engineering, and shipping
        software that lasts past the demo.
      </p>

      <ul className="mt-14 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="blog-index-card group block"
            >
              <time className="text-sm text-muted-foreground" dateTime={post.date}>
                {post.displayDate}
              </time>
              <h2 className="mt-3 text-2xl font-bold leading-tight group-hover:text-brown sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-base font-semibold leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-block font-serif text-sm italic text-brown">
                Read the note
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
