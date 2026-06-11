import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Logo } from "../ui/Logo";

/**
 * Shared shell for the auth screens: parallax starfield, two nebula glows,
 * and a centered glass card floating in space.
 */
export function AuthLayout({
  title,
  subtitle,
  children,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="starfield" aria-hidden />
      <div
        className="nebula-glow"
        style={{ background: "#6B21D6", top: "-20vmax", left: "-15vmax" }}
        aria-hidden
      />
      <div
        className="nebula-glow"
        style={{ background: "#1E90FF", bottom: "-25vmax", right: "-15vmax" }}
        aria-hidden
      />

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`glass relative z-10 w-full ${wide ? "max-w-lg" : "max-w-md"} p-8 sm:p-10`}
      >
        <div className="mb-8 text-center">
          <Logo size="lg" />
          <h1 className="mt-6 font-display text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-neutron/60">{subtitle}</p>}
        </div>
        {children}
      </motion.main>
    </div>
  );
}
