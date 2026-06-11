export interface Param {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

interface Props {
  params: Param[];
  onChange: (name: string, value: number) => void;
}

/** Live parameter sliders for any free variable (other than x/y) in the expressions. */
export function Sliders({ params, onChange }: Props) {
  if (params.length === 0) return null;
  return (
    <div className="border-t border-neutron/10 p-3">
      <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-widest text-neutron/40">
        Parameters
      </p>
      <div className="flex flex-col gap-3">
        {params.map((p) => (
          <div key={p.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-mono italic text-cosmic">{p.name}</span>
              <span className="font-mono tabular-nums text-neutron/70">{p.value.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={p.min}
              max={p.max}
              step={p.step}
              value={p.value}
              onChange={(e) => onChange(p.name, parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-cosmic"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-neutron/30">
              <span>{p.min}</span>
              <span>{p.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
