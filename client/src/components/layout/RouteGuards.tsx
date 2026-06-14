import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, hasEntitlement } from "../../store/auth";

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-cosmic border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

/** Only signed-in users pass. Others are sent to /login (with return path). */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, initializing } = useAuth();
  const location = useLocation();
  if (initializing) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

/** Only users with an active trial or subscription pass. Others see the paywall. */
export function RequireEntitlement({ children }: { children: ReactNode }) {
  const { user, subscription, paywallEnabled, initializing } = useAuth();
  if (initializing) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!hasEntitlement(user, subscription, paywallEnabled)) return <Navigate to="/subscribe" replace />;
  return <>{children}</>;
}

/** Signed-in users skip the auth pages entirely. */
export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const { user, initializing } = useAuth();
  if (initializing) return <FullScreenLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
