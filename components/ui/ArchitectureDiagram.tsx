import type { Architecture } from "@/data/types";
import { cn } from "@/lib/cn";
import { CANVAS_W, NODE_H, NODE_W, layout } from "@/lib/diagram";
import { Packet } from "./Packet";

type Props = {
  arch: Architecture;
  caption?: string;
  /** Thumbnail mode: no edge labels, no text alternative. */
  compact?: boolean;
  className?: string;
};

export function ArchitectureDiagram({ arch, caption, compact = false, className }: Props) {
  const { byId, routed, height } = layout(arch.nodes, arch.edges);

  const svg = (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${height}`}
      className={cn("h-auto w-full overflow-visible", !compact && "hidden sm:block")}
      aria-hidden
    >
      {routed.map(({ edge, d }) => (
        <path
          key={`${edge.from}-${edge.to}`}
          d={d}
          fill="none"
          className={cn("stroke-line-strong", edge.dashed && "flow-dash")}
          strokeWidth={1}
          strokeDasharray={edge.dashed ? "4 8" : undefined}
        />
      ))}

      {routed.map(({ edge, d, length }, i) => (
        <Packet key={`p-${edge.from}-${edge.to}`} d={d} dur={1.6 + length / 180} offset={i * 0.7} />
      ))}

      {!compact &&
        routed.map(({ edge, mx, my }) =>
          edge.label ? (
            <g key={`l-${edge.from}-${edge.to}`} transform={`translate(${mx} ${my})`}>
              <rect
                x={-(edge.label.length * 3.1 + 7)}
                y={-9}
                width={edge.label.length * 6.2 + 14}
                height={18}
                rx={2}
                className="fill-ink"
              />
              <text textAnchor="middle" y={3.5} className="fill-mute font-mono" fontSize={10}>
                {edge.label}
              </text>
            </g>
          ) : null,
        )}

      {arch.nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <rect
            width={NODE_W}
            height={NODE_H}
            rx={3}
            className={cn("fill-ink-2", n.accent ? "stroke-signal/60" : "stroke-line-strong")}
          />
          {n.accent && <rect x={0} y={0} width={4} height={NODE_H} rx={1} className="fill-signal" />}
          <circle cx={0} cy={NODE_H / 2} r={2.5} className="fill-ink stroke-line-strong" />
          <circle cx={NODE_W} cy={NODE_H / 2} r={2.5} className="fill-ink stroke-line-strong" />
          <text x={16} y={compact ? 34 : 25} className="fill-paper font-sans" fontSize={compact ? 17 : 14} fontWeight={500}>
            {n.label}
          </text>
          {!compact && n.sub && (
            <text x={16} y={42} className="fill-mute font-mono" fontSize={10}>
              {n.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );

  if (compact) return <div className={className}>{svg}</div>;

  return (
    <figure className={cn("relative", className)}>
      {svg}
      <ol className="space-y-2 font-mono text-[13px] sm:sr-only">
        {routed.map(({ edge }) => (
          <li key={`t-${edge.from}-${edge.to}`} className="flex flex-wrap items-center gap-x-2 border-b border-line pb-2">
            <span className="text-paper">{byId.get(edge.from)?.label}</span>
            <span className="text-signal" aria-hidden>
              →
            </span>
            <span className="sr-only">connects to</span>
            <span className="text-paper">{byId.get(edge.to)?.label}</span>
            {edge.label && <span className="text-mute">({edge.label})</span>}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="eyebrow mt-4 sm:mt-6">{caption}</figcaption>}
    </figure>
  );
}
