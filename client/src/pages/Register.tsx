import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";
import { SelectField } from "../components/ui/SelectField";
import type { ApiFieldErrors } from "../lib/api";

const GRADE_OPTIONS: [string, string][] = [
  ["KINDERGARTEN", "Kindergarten"],
  ["GRADE_1", "Grade 1"], ["GRADE_2", "Grade 2"], ["GRADE_3", "Grade 3"],
  ["GRADE_4", "Grade 4"], ["GRADE_5", "Grade 5"], ["GRADE_6", "Grade 6"],
  ["GRADE_7", "Grade 7"], ["GRADE_8", "Grade 8"], ["GRADE_9", "Grade 9"],
  ["GRADE_10", "Grade 10"], ["GRADE_11", "Grade 11"], ["GRADE_12", "Grade 12"],
  ["UNDERGRAD", "University — Undergraduate"],
  ["GRADUATE", "University — Graduate"],
];

export default function Register() {
  const navigate = useNavigate();
  const register = useAuth((s) => s.register);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    gradeLevel: "GRADE_6",
  });
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      const { message, code, fields } = err as {
        message: string;
        code?: string;
        fields?: ApiFieldErrors;
      };
      if (fields) setFieldErrors(fields);
      else if (code === "EMAIL_TAKEN") setFieldErrors({ email: [message] });
      else if (code === "USERNAME_TAKEN") setFieldErrors({ username: [message] });
      else setFormError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Begin your journey"
      subtitle="Full access free for 24 hours — no card required."
      wide
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          error={fieldErrors.email?.[0]}
        />
        <TextField
          label="Username"
          autoComplete="username"
          required
          value={form.username}
          onChange={set("username")}
          error={fieldErrors.username?.[0]}
          hint="3–20 characters. Letters, numbers, underscores."
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          value={form.password}
          onChange={set("password")}
          error={fieldErrors.password?.[0]}
          hint="At least 8 characters."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Date of birth"
            type="date"
            required
            value={form.dateOfBirth}
            onChange={set("dateOfBirth")}
            error={fieldErrors.dateOfBirth?.[0]}
          />
          <SelectField
            label="Grade level"
            value={form.gradeLevel}
            onChange={set("gradeLevel")}
            error={fieldErrors.gradeLevel?.[0]}
          >
            {GRADE_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectField>
        </div>

        {formError && (
          <p role="alert" className="rounded-lg bg-alert/10 border border-alert/30 px-4 py-3 text-sm text-alert">
            {formError}
          </p>
        )}

        <Button type="submit" variant="gold" loading={loading}>
          Create account & start trial
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutron/60">
        Already exploring?{" "}
        <Link to="/login" className="text-nebula hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
