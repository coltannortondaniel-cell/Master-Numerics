import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./store/auth";
import {
  RequireAuth,
  RedirectIfAuthed,
} from "./components/layout/RouteGuards";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Subscribe from "./pages/Subscribe";
import NotFound from "./pages/NotFound";
import { WarpProvider } from "./components/physics/WarpTransition";
import { XpToaster } from "./components/ui/XpToaster";
import { mathApi } from "./lib/physics";

// Code-split the journeys: KaTeX, the lesson viewer, and the simulations only
// load once a student actually enters a journey.
const Journey = lazy(() => import("./pages/Journey"));
const City = lazy(() => import("./pages/City"));
const World = lazy(() => import("./pages/World"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Friends = lazy(() => import("./pages/Friends"));
const Battle = lazy(() => import("./pages/Battle"));
const Store = lazy(() => import("./pages/Store"));
const Achievements = lazy(() => import("./pages/Achievements"));

function RouteFallback() {
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

export default function App() {
  const bootstrap = useAuth((s) => s.bootstrap);
  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return (
    <BrowserRouter>
      <WarpProvider>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/register"
            element={
              <RedirectIfAuthed>
                <Register />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/subscribe"
            element={
              <RequireAuth>
                <Subscribe />
              </RequireAuth>
            }
          />

          {/* Physics Journey */}
          <Route
            path="/journey"
            element={
              <RequireAuth>
                <Journey />
              </RequireAuth>
            }
          />
          <Route
            path="/journey/:worldSlug"
            element={
              <RequireAuth>
                <World />
              </RequireAuth>
            }
          />
          <Route
            path="/journey/:worldSlug/:lessonSlug"
            element={
              <RequireAuth>
                <Lesson />
              </RequireAuth>
            }
          />

          {/* Math City */}
          <Route
            path="/city"
            element={
              <RequireAuth>
                <City />
              </RequireAuth>
            }
          />
          <Route
            path="/city/:worldSlug"
            element={
              <RequireAuth>
                <World api={mathApi} basePath="/city" mapPath="/city" mapLabel="City Map" />
              </RequireAuth>
            }
          />
          <Route
            path="/city/:worldSlug/:lessonSlug"
            element={
              <RequireAuth>
                <Lesson api={mathApi} basePath="/city" />
              </RequireAuth>
            }
          />

          {/* NumPad Pro graphing calculator */}
          <Route
            path="/calculator"
            element={
              <RequireAuth>
                <Calculator />
              </RequireAuth>
            }
          />

          {/* Social */}
          <Route
            path="/leaderboard"
            element={
              <RequireAuth>
                <Leaderboard />
              </RequireAuth>
            }
          />
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <Friends />
              </RequireAuth>
            }
          />
          <Route
            path="/battle"
            element={
              <RequireAuth>
                <Battle />
              </RequireAuth>
            }
          />
          <Route
            path="/store"
            element={
              <RequireAuth>
                <Store />
              </RequireAuth>
            }
          />
          <Route
            path="/achievements"
            element={
              <RequireAuth>
                <Achievements />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <XpToaster />
      </WarpProvider>
    </BrowserRouter>
  );
}
