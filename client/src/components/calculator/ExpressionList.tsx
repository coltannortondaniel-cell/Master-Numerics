import { Tex } from "../ui/Tex";
import { isValid } from "../../lib/mathEval";

export interface ExprRow {
  id: string;
  raw: string;
  color: string;
  visible: boolean;
}

/** Best-effort conversion of calculator syntax to LaTeX for the live preview. */
export function toLatex(raw: string): string {
  let s = raw;
  s = s.replace(/sqrt\(([^()]*)\)/g, "\\sqrt{$1}");
  s = s.replace(/\b(pi|theta|tau|phi|alpha|beta|lambda|infinity)\b/g, (m) =>
    m === "infinity" ? "\\infty" : `\\${m}`
  );
  s = s.replace(/\*/g, "\\cdot ");
  s = s.replace(/<=/g, "\\le ").replace(/>=/g, "\\ge ");
  return s;
}

/** Validity of the right-hand side / body of an expression row. */
function bodyValid(raw: string): boolean {
  if (!raw.trim()) return true;
  const body = raw.includes("=") ? raw.slice(raw.indexOf("=") + 1) : raw;
  return isValid(body);
}

interface Props {
  rows: ExprRow[];
  onChange: (id: string, patch: Partial<ExprRow>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function ExpressionList({ rows, onChange, onAdd, onRemove }: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {rows.map((row, i) => {
          const valid = bodyValid(row.raw);
          return (
            <div
              key={row.id}
              className="group flex items-start gap-2 border-b border-neutron/10 px-3 py-3"
            >
              <button
                onClick={() => onChange(row.id, { visible: !row.visible })}
                className="mt-1 h-5 w-5 shrink-0 rounded-full border-2"
                style={{
                  borderColor: row.color,
                  background: row.visible ? row.color : "transparent",
                }}
                aria-label={row.visible ? "Hide" : "Show"}
                title={row.visible ? "Hide" : "Show"}
              />
              <div className="min-w-0 flex-1">
                <input
                  value={row.raw}
                  onChange={(e) => onChange(row.id, { raw: e.target.value })}
                  placeholder={i === 0 ? "y = x^2" : "expression"}
                  spellCheck={false}
                  autoCapitalize="off"
                  className={`w-full bg-transparent font-mono text-sm outline-none ${
                    valid ? "text-neutron" : "text-alert"
                  }`}
                />
                {row.raw.trim() && (
                  <div className="mt-1 min-h-[1.2rem] text-neutron/70">
                    {valid ? (
                      <Tex tex={toLatex(row.raw)} />
                    ) : (
                      <span className="text-xs text-alert">Check syntax</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => onRemove(row.id)}
                className="mt-1 text-neutron/30 opacity-0 transition-opacity hover:text-alert group-hover:opacity-100"
                aria-label="Delete expression"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={onAdd}
        className="border-t border-neutron/10 px-3 py-3 text-left text-sm font-semibold text-cosmic hover:bg-white/5"
      >
        + Add expression
      </button>
    </div>
  );
}
