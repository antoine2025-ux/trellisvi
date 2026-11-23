import type { CSSProperties, ReactNode } from "react";
import powerintelLogo from "@/assets/powerintel-logo.png";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  onInk = false,
  className,
}: {
  children: ReactNode;
  onInk?: boolean;
  className?: string;
}) {
  return <p className={cn("eyebrow", onInk && "eyebrow--on-ink", className)}>{children}</p>;
}

export function SectionHeader({
  index,
  label,
  title,
  lede,
  onInk = false,
  align = "left",
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  onInk?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <Eyebrow onInk={onInk}>
        <span className="eyebrow-index">{index}</span>
        {label}
      </Eyebrow>
      <h2 className={cn("section-title mt-5", onInk && "text-[var(--brown-foreground)]")}>
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "section-lede mt-5",
            onInk && "section-lede--on-ink",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}

type SlabTone = "plain" | "paper" | "ink";

export function Slab({
  id,
  tone = "plain",
  className,
  innerClassName,
  children,
}: {
  id?: string;
  tone?: SlabTone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("slab", tone !== "plain" && `slab--${tone}`, className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", innerClassName)}>{children}</div>
    </section>
  );
}

export function DiagramBlock({
  label = "Diagram",
  caption,
  children,
  className,
}: {
  label?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("diagram", className)}>
      <figcaption className="diagram-label">{label}</figcaption>
      {children}
      {caption ? <p className="diagram-caption">{caption}</p> : null}
    </figure>
  );
}

export function LedgerTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="ledger">
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, i) => (
                <td key={cell} data-label={head[i]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RememberCallout({
  label = "Remember",
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("remember", className)}>
      <p className="remember-label">{label}</p>
      <p className="remember-body">{children}</p>
    </blockquote>
  );
}

export function Pill({
  tone = "soft",
  children,
  className,
}: {
  tone?: "soft" | "brown" | "success" | "ink" | "outline";
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("pill", `pill--${tone}`, className)}>{children}</span>;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("logo-mark", className)}
      style={{ "--logo-src": `url(${powerintelLogo})` } as CSSProperties}
      aria-hidden="true"
    />
  );
}
