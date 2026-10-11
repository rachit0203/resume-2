import type { Principle } from "@/data/types";
import { route } from "@/lib/diagram";
import { Packet } from "./Packet";

const label = "fill-mute font-mono";

function Users() {
  const loop = "M200 42 A112 112 0 1 1 199.9 42";
  const pts = [
    { x: 200, y: 42, t: "user", dx: 0, dy: -14, a: "middle" as const },
    { x: 297, y: 210, t: "product", dx: 14, dy: 16, a: "start" as const },
    { x: 103, y: 210, t: "feedback", dx: -14, dy: 16, a: "end" as const },
  ];
  return (
    <>
      <path d={loop} fill="none" className="stroke-line-strong" />
      <Packet d={loop} dur={5} />
      <Packet d={loop} dur={5} offset={2.5} />
      {pts.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r={6} className={p.t === "user" ? "fill-signal" : "fill-ink stroke-paper/70"} />
          <text x={p.x + p.dx} y={p.y + p.dy} textAnchor={p.a} className={label} fontSize={11}>
            {p.t}
          </text>
        </g>
      ))}
      <text x={200} y={158} textAnchor="middle" className="fill-paper font-sans" fontSize={15} fontWeight={500}>
        ship → observe
      </text>
      <text x={200} y={178} textAnchor="middle" className={label} fontSize={11}>
        → iterate
      </text>
    </>
  );
}

function System() {
  const w = 84;
  const h = 34;
  const nodes = [
    { id: "ui", label: "ui", x: 20, y: 132 },
    { id: "api", label: "api", x: 158, y: 56 },
    { id: "auth", label: "auth", x: 158, y: 208 },
    { id: "db", label: "db", x: 296, y: 56 },
    { id: "events", label: "events", x: 296, y: 208 },
  ];
  const by = new Map(nodes.map((n) => [n.id, n]));
  const edges = [
    ["ui", "api"],
    ["ui", "auth"],
    ["api", "db"],
    ["api", "events"],
    ["auth", "db"],
  ].map(([a, b]) => route(by.get(a)!, by.get(b)!, w, h));
  return (
    <>
      {edges.map((e) => (
        <path key={e.d} d={e.d} fill="none" className="stroke-line-strong" />
      ))}
      {edges.map((e, i) => (
        <Packet key={`p${e.d}`} d={e.d} dur={1.8 + i * 0.25} offset={i * 0.6} size={0.85} />
      ))}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <rect width={w} height={h} rx={3} className={n.id === "api" ? "fill-ink-2 stroke-signal/60" : "fill-ink-2 stroke-line-strong"} />
          <text x={w / 2} y={21} textAnchor="middle" className="fill-paper font-mono" fontSize={12}>
            {n.label}
          </text>
        </g>
      ))}
    </>
  );
}

function Automate() {
  const manual = "M40 226 L80 176 L120 226 L160 176 L200 226 L240 176 L280 226 L320 176 L360 226";
  const auto = "M40 86 L360 86";
  return (
    <>
      <text x={40} y={58} className={label} fontSize={11}>
        automated — 1 step
      </text>
      <path d={auto} className="stroke-signal/70" strokeWidth={1.25} />
      <Packet d={auto} dur={1.2} />
      <Packet d={auto} dur={1.2} offset={0.6} />
      <text x={40} y={150} className={label} fontSize={11}>
        manual — 8 steps
      </text>
      <path d={manual} fill="none" className="stroke-dim" strokeDasharray="3 5" />
      <Packet d={manual} dur={7} size={0.7} />
      {[40, 360].map((x) => (
        <g key={x}>
          <circle cx={x} cy={86} r={5} className="fill-ink stroke-paper/70" />
          <circle cx={x} cy={226} r={5} className="fill-ink stroke-dim" />
        </g>
      ))}
    </>
  );
}

function Learn() {
  const cx = 200;
  const cy = 150;
  const ring = (r: number, n: number, start = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = start + (i / n) * Math.PI * 2;
      return { x: +(cx + r * Math.cos(a)).toFixed(1), y: +(cy + r * Math.sin(a)).toFixed(1) };
    });
  const inner = ring(64, 5, -Math.PI / 2);
  const outer = ring(118, 9, -Math.PI / 2 + 0.3);
  return (
    <>
      <circle cx={cx} cy={cy} r={64} fill="none" className="stroke-line" strokeDasharray="2 5" />
      <circle cx={cx} cy={cy} r={118} fill="none" className="stroke-line" strokeDasharray="2 5" />
      {inner.map((p) => {
        const d = `M${cx} ${cy} L${p.x} ${p.y}`;
        return <path key={d} d={d} className="stroke-line-strong" />;
      })}
      <Packet d={`M${cx} ${cy} L${inner[1].x} ${inner[1].y}`} dur={1.6} />
      <Packet d={`M${cx} ${cy} L${inner[3].x} ${inner[3].y}`} dur={1.6} offset={0.8} />
      {inner.map((p) => (
        <circle key={`i${p.x}`} cx={p.x} cy={p.y} r={4.5} className="fill-ink stroke-paper/70" />
      ))}
      {outer.map((p, i) => (
        <circle
          key={`o${p.x}`}
          cx={p.x}
          cy={p.y}
          r={3}
          className="fill-dim"
          style={{ animation: `blink 3.2s ${i * 0.35}s steps(2) infinite` }}
        />
      ))}
      <circle cx={cx} cy={cy} r={8} className="fill-signal" />
      <text x={cx} y={cy + 30} textAnchor="middle" className={label} fontSize={11}>
        you are here
      </text>
    </>
  );
}

const map = { users: Users, system: System, automate: Automate, learn: Learn };

export function PrincipleDiagram({ id }: { id: Principle["id"] }) {
  const Diagram = map[id];
  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full overflow-visible" aria-hidden>
      <Diagram />
    </svg>
  );
}
