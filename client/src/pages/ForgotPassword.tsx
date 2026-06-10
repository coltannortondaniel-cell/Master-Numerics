import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api, parseApiError } from "../lib/api";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
    >
      {sent ? (
        <div className="text-center">
          <p className="rounded-lg bg-success/10 border border-success/30 px-4 py-4 text-sm text-success">
            If that email has an account, a reset link is on its way. It expires in 1 hour.
          </p>
          <Link to="/login" className="mt-6 inline-block text-nebula hover:underline text-sm">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p role="alert" className="text-sm text-alert">
              {error}
            </p>
          )}
          <Button type="submit" loading={loading}>
            Send reset link
          </Button>
          <Link to="/login" className="text-center text-sm text-neutron/60 hover:text-neutron">
            Back to sign in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
