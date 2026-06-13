import { Reorder } from "framer-motion";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { InlineMath } from "../../../ui/InlineMath";

interface Props {
  /** The items to arrange (already shuffled by the server). */
  items: string[];
  value: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
}

/** Drag (or use the arrows) to put the steps in the correct order. */
export function OrderInput({ items, value, onChange, disabled }: Props) {
  const order = value.length === items.length ? value : items;

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (disabled || j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <Reorder.Group
      axis="y"
      values={order}
      onReorder={disabled ? () => {} : onChange}
      className="flex flex-col gap-2"
    >
      {order.map((item, i) => (
        <Reorder.Item
          key={item}
          value={item}
          dragListener={!disabled}
          className={`flex items-center gap-2 rounded-lg border border-line/12 bg-surface px-3 py-2.5 text-sm ${
            disabled ? "" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs font-bold text-accent">
            {i + 1}
          </span>
          <GripVertical size={16} className="shrink-0 text-fg/30" />
          <span className="min-w-0 flex-1">
            <InlineMath text={item} />
          </span>
          {!disabled && (
            <span className="flex shrink-0 flex-col">
              <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="text-fg/40 hover:text-fg">
                <ChevronUp size={16} />
              </button>
              <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="text-fg/40 hover:text-fg">
                <ChevronDown size={16} />
              </button>
            </span>
          )}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
