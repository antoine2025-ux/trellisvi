import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const linkClass = "whitespace-nowrap font-semibold text-foreground hover:text-brown";
const activeClass = "text-brown";

const builtWith = [
  { name: "Loopwell", href: "https://www.loopwell.io" },
  { name: "Providens", href: "https://www.powerintel.co/products/providens" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8">
      <Link to="/" className="font-serif text-lg tracking-tight">
        Trellis VI Studio
      </Link>
      <nav
        aria-label="Site"
        className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-lg text-foreground"
      >
        <Link
          to="/blog"
          className={linkClass}
          activeProps={{ className: activeClass }}
          activeOptions={{ exact: false }}
        >
          Blog
        </Link>
        <span aria-hidden="true" className="font-normal text-muted-foreground">|</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center gap-1 bg-transparent text-lg font-semibold text-foreground outline-none hover:text-brown data-[state=open]:text-brown">
            Built with Trellis VI
            <ChevronDown className="size-4 opacity-80" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="h-auto w-auto min-w-0 max-h-none overflow-hidden rounded-xl border-border bg-card p-1 shadow-[0_14px_28px_-14px_oklch(0.28_0.055_262_/_0.28)]"
          >
            {builtWith.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-auto cursor-pointer rounded-lg px-3 py-1.5 font-serif text-sm font-bold leading-tight text-foreground focus:bg-secondary focus:text-foreground"
                >
                  {item.name}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span aria-hidden="true" className="font-normal text-muted-foreground">|</span>
        <Link
          to="/community"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          Community
        </Link>
        <span aria-hidden="true" className="font-normal text-muted-foreground">|</span>
        <Link
          to="/resources"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          Free resources
        </Link>
        <span aria-hidden="true" className="font-normal text-muted-foreground">|</span>
        <Link
          to="/login"
          className={linkClass}
          activeProps={{ className: activeClass }}
        >
          Course login
        </Link>
      </nav>
    </header>
  );
}
