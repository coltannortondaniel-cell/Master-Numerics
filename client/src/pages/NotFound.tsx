import { Link } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";

export default function NotFound() {
  return (
    <AuthLayout title="Lost in space" subtitle="This page drifted beyond the observable universe.">
      <p className="text-center">
        <Link to="/" className="text-nebula hover:underline">
          Return to known coordinates
        </Link>
      </p>
    </AuthLayout>
  );
}
