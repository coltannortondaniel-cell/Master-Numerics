import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useXp } from "../../store/xp";
import { rankForXp } from "../../lib/rank";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";

interface Props {
  back?: { to: string; label: string } | { onClick: () => void; label: string };
}

/** Shared top bar for the Journey pages: brand, live XP + rank, account. */
export function JourneyHeader({ back }: Props) {
  const { user, logout } = useAuth();
  const liveXp = useXp((s) => s.totalXp);
  const liveCoins = useXp((s) => s.coins);
  const xp = liveXp ?? user?.xp ?? 0;
  const coins = liveCoins ?? user?.coins ?? 0;
  const rank = rankForXp(xp);

  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-neutron/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 min-w-0">
        {back &&
          ("to" in back ? (
            <Link
              to={back.to}
              className="text-sm text-neutron/60 hover:text-neutron transition-colors whitespace-nowrap"
            >
              ← {back.label}
            </Link>
          ) : (
            <button
              onClick={back.onClick}
              className="text-sm text-neutron/60 hover:text-neutron transition-colors whitespace-nowrap"
            >
              ← {back.label}
            </button>
          ))}
        <div className="hidden sm:block">
          <Logo />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5" title="NumCoins">
          <span aria-hidden>🪙</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-solar">
            {coins.toLocaleString()}
          </span>
        </div>
        <div
          className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5"
          title={`${rank.name} rank`}
        >
          <span aria-hidden>{rank.icon}</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-solar">
            {xp.toLocaleString()}
          </span>
          <span className="hidden sm:inline text-xs text-neutron/50">XP</span>
        </div>
        {user && (
          <Link
            to={`/profile/${user.username}`}
            className="hidden md:inline text-sm text-neutron/60 hover:text-neutron transition-colors"
          >
            @{user.username}
          </Link>
        )}
        <Button variant="ghost" onClick={() => void logout()}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
