import { Fragment, type CSSProperties } from "react";

type Part = string | { em: string };

/** Line-masked word reveal driven by CSS; server-rendered, no JS. */
export function SplitWords({ parts, offset = 0 }: { parts: Part[]; offset?: number }) {
  let i = offset;
  const text = parts.map((p) => (typeof p === "string" ? p : p.em)).join(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="words" aria-hidden>
        {parts.flatMap((part, pi) => {
          const em = typeof part !== "string";
          const words = (em ? part.em : part).split(" ").filter(Boolean);
          return words.map((word, wi) => {
            const style = { "--i": i++ } as CSSProperties;
            return (
              <Fragment key={`${pi}-${wi}`}>
                <span>
                  <span style={style}>{em ? <em>{word}</em> : word}</span>
                </span>{" "}
              </Fragment>
            );
          });
        })}
      </span>
    </>
  );
}
