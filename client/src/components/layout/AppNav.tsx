import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass,
  Calculator,
  ShoppingBag,
  Trophy,
  User,
  Swords,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import { Logo } from "../ui/Logo";

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  /** Route prefixes that should light this item up. */
  match: string[];
  /** Show in the compact mobile bottom bar. */
  mobile?: boolean;
}

function useNavItems(): NavItem[] {
  const username = useAuth((s) => s.user?.username);
  return [
    { to: "/journey", label: "Learn", icon: <Compass size={22} />, match: ["/journey", "/city", "/dashboard"], mobile: true },
    { to: "/calculator", label: "Calculator", icon: <Calculator size={22} />, match: ["/calculator"], mobile: true },
    { to: "/store", label: "Shop", icon: <ShoppingBag size={22} />, match: ["/store"], mobile: true },
    { to: "/leaderboard", label: "Ranks", icon: <Trophy size={22} />, match: ["/leaderboard"], mobile: true },
    { to: "/battle", label: "Battle", icon: <Swords size={22} />, match: ["/battle"] },
    {
      to: username ? `/profile/${username}` : "/dashboard",
      label: "Profile",
      icon: <User size={22} />,
      match: ["/profile"],
      mobile: true,
    },
    { to: "/settings", label: "Settings", icon: <SettingsIcon size={22} />, match: ["/settings"] },
  ];
}

function isActive(pathname: string, item: NavItem): boolean {
  return item.match.some((m) => pathname === m || pathname.startsWith(m + "/"));
}

/** Left side rail (desktop) — icon + label, brand mark at top. */
function SideRail({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-40 hidden w-[88px] flex-col items-center gap-1 border-r border-line/10 bg-base/80 py-5 backdrop-blur-md md:flex xl:w-[208px] xl:items-stretch xl:px-3"
    >
      <div className="mb-4 flex justify-center xl:justify-start xl:px-2">
        <Logo />
      </div>
      {items.map((it) => {
        const active = isActive(pathname, it);
        return (
          <Link
            key={it.label}
            to={it.to}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[0.65rem] font-semibold transition-colors xl:flex-row xl:gap-3 xl:px-3 xl:text-sm ${
              active
                ? "bg-accent/15 text-accent"
                : "text-fg/55 hover:bg-line/5 hover:text-fg"
            }`}
          >
            <span className="shrink-0">{it.icon}</span>
            <span className="xl:tracking-wide">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Bottom tab bar (mobile) — the 5 key destinations. */
function BottomBar({ items, pathname }: { items: NavItem[]; pathname: string }) {
  const tabs = items.filter((it) => it.mobile);
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-line/10 bg-base/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      {tabs.map((it) => {
        const active = isActive(pathname, it);
        return (
          <Link
            key={it.label}
            to={it.to}
            aria-current={active ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.6rem] font-semibold transition-colors ${
              active ? "text-accent" : "text-fg/55"
            }`}
          >
            {it.icon}
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Responsive app navigation: a left side rail on desktop, a bottom tab bar on
 * mobile. Wrap page content in <AppShell> to get the nav plus correct padding.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const items = useNavItems();
  return (
    <>
      <SideRail items={items} pathname={pathname} />
      <BottomBar items={items} pathname={pathname} />
      <div className="md:pl-[88px] xl:pl-[208px]">
        <div className="pb-20 md:pb-0">{children}</div>
      </div>
    </>
  );
}
