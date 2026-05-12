"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portal", label: "Client Portal" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(245,242,236,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(107,122,69,0.15)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
          style={{ color: "#1a1a1a" }}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
            style={{ background: "rgba(201,169,106,0.2)", border: "1px solid rgba(201,169,106,0.3)", color: "#C9A96A" }}
          >
            T
          </span>
          TaxFlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
              style={{
                color: isActive(item.href) ? "#C9A96A" : "#4a4a4a",
                background: isActive(item.href) ? "rgba(201,169,106,0.1)" : "transparent",
                fontWeight: isActive(item.href) ? 600 : 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/portal"
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#C9A96A", color: "#2d3318" }}
              >
                Portal
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:opacity-80"
                style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:opacity-80"
                style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a" }}
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "#C9A96A", color: "#2d3318" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
          style={{ background: "rgba(201,169,106,0.12)", border: "1px solid rgba(201,169,106,0.25)", color: "#C9A96A" }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t md:hidden"
          style={{ background: "rgba(245,242,236,0.98)", borderColor: "rgba(107,122,69,0.15)" }}
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium transition-all"
                style={{
                  color: isActive(item.href) ? "#C9A96A" : "#4a4a4a",
                  background: isActive(item.href) ? "rgba(201,169,106,0.1)" : "transparent",
                  fontWeight: isActive(item.href) ? 600 : 500,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t px-4 py-4" style={{ borderColor: "rgba(107,122,69,0.12)" }}>
            {user ? (
              <>
                <Link
                  href="/portal"
                  className="rounded-full py-3 text-center text-sm font-semibold"
                  style={{ background: "#C9A96A", color: "#2d3318" }}
                >
                  Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border py-3 text-sm font-semibold"
                  style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-full border py-3 text-center text-sm font-semibold"
                  style={{ borderColor: "rgba(107,122,69,0.3)", color: "#4a4a4a" }}
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full py-3 text-center text-sm font-semibold"
                  style={{ background: "#C9A96A", color: "#2d3318" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
