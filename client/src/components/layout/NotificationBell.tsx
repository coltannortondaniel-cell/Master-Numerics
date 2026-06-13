import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, UserPlus, Award, Swords, Gift, Sparkles, type LucideIcon } from "lucide-react";
import { notificationsApi, type Notification } from "../../lib/notifications";

const ICON: Record<string, LucideIcon> = {
  friend_request: UserPlus,
  achievement: Award,
  battle: Swords,
  store: Gift,
  system: Sparkles,
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const load = () =>
    notificationsApi
      .list()
      .then((d) => {
        setItems(d.notifications);
        setUnread(d.unread);
      })
      .catch(() => {});

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) {
      notificationsApi.markRead().then(() => setUnread(0));
      setItems((its) => its.map((i) => ({ ...i, read: true })));
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggle}
        className="relative grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-white/10"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.75} className="text-neutron/80" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-alert px-1 text-[0.6rem] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-neutron/15 bg-[#0c0e1a] shadow-2xl">
          <div className="border-b border-neutron/10 px-4 py-2.5 text-sm font-semibold">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-neutron/45">You're all caught up.</p>
            ) : (
              items.map((n) => {
                const NIcon = ICON[n.type] ?? Sparkles;
                return (
                <button
                  key={n.id}
                  onClick={() => {
                    setOpen(false);
                    if (n.link) navigate(n.link);
                  }}
                  className="flex w-full items-start gap-3 border-b border-neutron/5 px-4 py-3 text-left hover:bg-white/5"
                >
                  <NIcon size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-neutron/60" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    {n.body && <p className="text-xs text-neutron/55">{n.body}</p>}
                    <p className="mt-0.5 text-[0.65rem] text-neutron/35">
                      {new Date(n.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
