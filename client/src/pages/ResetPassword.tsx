import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api, parseApiError } from "../lib/api";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      navigate("/login", { state: { resetDone: true } });
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthLayout title="Link missing" subtitle="This page needs a reset link from your email.">
        <p className="text-center text-sm text-neutron/60">
          Open the link in the email we sent, or{" "}
          <Link to="/forgot-password" className="text-nebula hover:underline">
            request a new one
          </Link>
          .
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Choose a new password">
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="New password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="At least 8 characters."
        />
        <TextField
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && (
          <p role="alert" className="text-sm text-alert">
            {error}
          </p>
        )}
        <Button type="submit" loading={loading}>
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}
