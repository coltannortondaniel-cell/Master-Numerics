import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetDone = (location.state as { resetDone?: boolean } | null)?.resetDone;

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/dashboard";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError((err as { message: string }).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="The cosmos kept your place.">
      {resetDone && (
        <p className="mb-4 rounded-lg bg-success/10 border border-success/30 px-4 py-3 text-sm text-success">
          Password updated. Sign in with your new password.
        </p>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-neutron/70 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-[#6B21D6]"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-nebula hover:underline">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-alert/10 border border-alert/30 px-4 py-3 text-sm text-alert">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Sign in
        </Button>
        <Button type="button" variant="ghost" disabled title="Google sign-in arrives in a later phase">
          Continue with Google — coming soon
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutron/60">
        New here?{" "}
        <Link to="/register" className="text-solar hover:underline">
          Start your free day
        </Link>
      </p>
    </AuthLayout>
  );
}
