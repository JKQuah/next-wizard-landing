import { Fragment } from "react";

export type RichTextLink = { href: string; label: string };

type RichTextProps = {
  text: string;
  /** Resolves `{token}` placeholders to links. */
  links?: Record<string, RichTextLink>;
};

/**
 * Tiny formatter for dictionary strings:
 *   `**bold**`  -> <strong>
 *   `{token}`   -> link from `links[token]`
 */
export function RichText({ text, links = {} }: RichTextProps) {
  const parts = text.split(/(\*\*[^*]+\*\*|\{\w+\})/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-extrabold text-primary">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const token = /^\{(\w+)\}$/.exec(part)?.[1];
        const link = token ? links[token] : undefined;
        if (link) {
          const isHttp = link.href.startsWith("http");
          return (
            <a
              key={i}
              href={link.href}
              {...(isHttp && { target: "_blank", rel: "noopener noreferrer" })}
              className="font-bold text-primary underline decoration-secondary-500 decoration-2 underline-offset-4 hover:text-secondary-500"
            >
              {link.label}
            </a>
          );
        }

        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
