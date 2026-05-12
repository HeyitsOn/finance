"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portal", label: "Client Portal" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(245,242,236,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(107,122,69,0.15)",
      }}
    >
      {/* Top bar: logo + auth buttons */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
          style={{ color: "#1a1a1a" }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold sm:h-9 sm:w-9"
            style={{ background: "rgba(201,169,106,0.2)", border: "1px solid rgba(201,169,106,0.3)", color: "#C9A96A" }}
          >
            T
          </span>
          TaxFlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{ color: "#4a4a4a" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/portal"
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-105 sm:px-5 sm:text-sm"
                style={{ background: "#C9A96A", color: "#2d3318" }}
              >
                Portal
              </Link>
              <button
                onClick={handleLogout}
                className="hidden rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:opacity-80 md:block"
                style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a", background: "transparent" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border px-4 py-2 text-xs font-semibold transition-all hover:opacity-80 sm:px-5 sm:text-sm"
                style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a", background: "transparent" }}
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-105 sm:px-5 sm:text-sm"
                style={{ background: "#C9A96A", color: "#2d3318" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav strip — always visible, scrolls horizontally */}
      <div
        className="overflow-x-auto border-t md:hidden"
        style={{ borderColor: "rgba(107,122,69,0.1)" }}
      >
        <nav className="flex min-w-max gap-1 px-4 py-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-[rgba(201,169,106,0.1)]"
              style={{ color: "#4a4a4a" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
