import type { ReactNode } from "react";
import { Moon, Sun, Eye, Type, Sparkles, Volume2, VolumeX, Keyboard } from "lucide-react";
import { CosmicBackground } from "../components/physics/CosmicBackground";
import { JourneyHeader } from "../components/layout/JourneyHeader";
import {
  useSettings,
  type TextSize,
  type Theme,
} from "../store/settings";

/* ---- Small, self-contained controls (sharp, on-brand) ---- */

function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: ReactNode }[];
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-lg border border-line/15 bg-base/60 p-1"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-accent text-white"
                : "text-fg/60 hover:text-fg"
            }`}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-line/20"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Row({
  icon,
  title,
  desc,
  children,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-accent" aria-hidden>
          {icon}
        </span>
        <div>
          <p className="font-display text-lg font-semibold leading-tight">{title}</p>
          <p className="mt-0.5 text-sm text-fg/55">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass px-5 py-5 sm:px-6">
      <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.3em] text-nebula">
        {title}
      </h2>
      <div className="divide-y divide-line/10">{children}</div>
    </section>
  );
}

function Slider({
  value,
  onChange,
  disabled,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <input
      type="range"
      min={0}
      max={100}
      value={Math.round(value * 100)}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value) / 100)}
      className="h-1.5 w-40 cursor-pointer appearance-none rounded-full bg-line/20 accent-accent disabled:opacity-40"
    />
  );
}

export default function Settings() {
  const s = useSettings();

  return (
    <div className="relative min-h-screen">
      <CosmicBackground palette={{ accent: "#2D7DFF", glow: "#2D7DFF" }} />
      <JourneyHeader back={{ to: "/dashboard", label: "Dashboard" }} />
      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-nebula">Preferences</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Settings</h1>
        </div>

        <div className="flex flex-col gap-5">
          <Section title="Appearance">
            <Row
              icon={s.theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              title="Theme"
              desc="Switch between the dark star-field and a clean light mode."
            >
              <Segmented<Theme>
                label="Theme"
                value={s.theme}
                onChange={(v) => s.set("theme", v)}
                options={[
                  { value: "dark", label: "Dark", icon: <Moon size={15} /> },
                  { value: "light", label: "Light", icon: <Sun size={15} /> },
                ]}
              />
            </Row>
          </Section>

          <Section title="Accessibility">
            <Row
              icon={<Sparkles size={20} />}
              title="Reduce motion"
              desc="Calms the star-field and animations across the app."
            >
              <Toggle
                label="Reduce motion"
                checked={s.motion === "reduced"}
                onChange={(v) => s.set("motion", v ? "reduced" : "full")}
              />
            </Row>
            <Row
              icon={<Eye size={20} />}
              title="High contrast"
              desc="Boosts borders, text, and accent contrast for readability."
            >
              <Toggle
                label="High contrast"
                checked={s.contrast === "high"}
                onChange={(v) => s.set("contrast", v ? "high" : "normal")}
              />
            </Row>
            <Row
              icon={<Type size={20} />}
              title="Text size"
              desc="Make body text larger throughout the app."
            >
              <Segmented<TextSize>
                label="Text size"
                value={s.textSize}
                onChange={(v) => s.set("textSize", v)}
                options={[
                  { value: "normal", label: "A" },
                  { value: "large", label: "A+" },
                  { value: "xlarge", label: "A++" },
                ]}
              />
            </Row>
            <Row
              icon={<Type size={20} />}
              title="Dyslexia-friendly font"
              desc="Use the highly legible Atkinson Hyperlegible typeface."
            >
              <Toggle
                label="Dyslexia-friendly font"
                checked={s.font === "dyslexic"}
                onChange={(v) => s.set("font", v ? "dyslexic" : "default")}
              />
            </Row>
            <Row
              icon={<Keyboard size={20} />}
              title="Keyboard navigation"
              desc="Always on — Tab to move, Enter/Space to answer, with visible focus rings."
            >
              <span className="rounded-md bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                Enabled
              </span>
            </Row>
          </Section>

          <Section title="Sound">
            <Row
              icon={s.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              title="Mute everything"
              desc="Silence all sound effects and background music."
            >
              <Toggle
                label="Mute everything"
                checked={s.muted}
                onChange={(v) => s.set("muted", v)}
              />
            </Row>
            <Row
              icon={<Volume2 size={20} />}
              title="Sound effects"
              desc="Clicks, correct/wrong cues, and level-up chimes."
            >
              <Slider
                label="Sound-effects volume"
                value={s.sfxVolume}
                disabled={s.muted}
                onChange={(v) => s.set("sfxVolume", v)}
              />
            </Row>
            <Row
              icon={<Volume2 size={20} />}
              title="Background music"
              desc="Gentle ambient track while you learn."
            >
              <Slider
                label="Background-music volume"
                value={s.musicVolume}
                disabled={s.muted}
                onChange={(v) => s.set("musicVolume", v)}
              />
            </Row>
          </Section>

          <button
            onClick={s.reset}
            className="mx-auto text-sm text-fg/45 underline-offset-4 hover:text-fg hover:underline"
          >
            Reset to defaults
          </button>
        </div>
      </main>
    </div>
  );
}
