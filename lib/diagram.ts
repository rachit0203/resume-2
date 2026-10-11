import type { ArchEdge, ArchNode } from "@/data/types";

export const NODE_W = 168;
export const NODE_H = 56;
export const CANVAS_W = 800;

export type Routed = { d: string; mx: number; my: number; length: number };

/** Routes an edge between two boxes with a smooth cubic, choosing sides by relative position. */
export function route(a: ArchNode, b: ArchNode, w = NODE_W, h = NODE_H): Routed {
  let x1: number, y1: number, x2: number, y2: number, horizontal: boolean;

  if (b.x >= a.x + w) [x1, y1, x2, y2, horizontal] = [a.x + w, a.y + h / 2, b.x, b.y + h / 2, true];
  else if (b.x + w <= a.x) [x1, y1, x2, y2, horizontal] = [a.x, a.y + h / 2, b.x + w, b.y + h / 2, true];
  else if (b.y > a.y) [x1, y1, x2, y2, horizontal] = [a.x + w / 2, a.y + h, b.x + w / 2, b.y, false];
  else [x1, y1, x2, y2, horizontal] = [a.x + w / 2, a.y, b.x + w / 2, b.y + h, false];

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const d = horizontal
    ? `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
    : `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;

  return { d, mx, my, length: Math.hypot(x2 - x1, y2 - y1) };
}

export function layout(nodes: ArchNode[], edges: ArchEdge[]) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const routed = edges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    return a && b ? [{ edge: e, from: a, to: b, ...route(a, b) }] : [];
  });
  const height = Math.max(...nodes.map((n) => n.y + NODE_H)) + 24;
  return { byId, routed, height };
}
