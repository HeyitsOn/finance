"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, FileText, BarChart3, CheckCircle } from "lucide-react";

const portalFeatures = [
  {
    icon: Shield,
    title: "Secure file uploads",
    description: "Send documents safely with a minimal, trusted workflow.",
  },
  {
    icon: TrendingUp,
    title: "Progress tracking",
    description: "See review stages and completion status at a glance.",
  },
  {
    icon: Users,
    title: "Advisor support",
    description: "A finance professional reviews your documents and keeps you informed.",
  },
];

const services = [
  { icon: FileText, title: "Tax preparation support", description: "Accurate, timely tax preparation to maximise your returns." },
  { icon: BarChart3, title: "Document organisation", description: "We help you organise and store important financial documents." },
  { icon: TrendingUp, title: "Financial reporting", description: "Clear insights and reports to help you make confident financial decisions." },
  { icon: CheckCircle, title: "Compliance tracking", description: "Stay on top of deadlines, filings, and regulatory requirements." },
];

const steps = [
  "Submit your documents",
  "We review and organise them",
  "Receive structured updates and reports",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #4F5B35 0%, #6B7A45 40%, #5a6840 70%, #3d4728 100%)" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse 80% 60% at 60% 20%, #C9A96A33 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Hero */}
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#C9A96A" }}
            >
              Managed Finance Services
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl"
              style={{ color: "#F8F6F1" }}
            >
              Financial Management,{" "}
              <span style={{ color: "#C9A96A" }}>Made Simple</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-lg text-base leading-8"
              style={{ color: "#F8F6F1CC" }}
            >
              A personal finance service that helps you organise, track, and manage your financial documents with clarity and confidence.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/booking"
                className="rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(201,169,106,0.4)]"
                style={{ background: "#C9A96A", color: "#2d3318" }}
              >
                Book Consultation
              </Link>
              <Link
                href="/portal"
                className="rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ borderColor: "#F8F6F133", background: "#F8F6F10D", color: "#F8F6F1", backdropFilter: "blur(8px)" }}
              >
                Access Client Portal
              </Link>
            </motion.div>
          </div>

          {/* Glassmorphism panel */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-[28px] border p-7"
            style={{
              background: "rgba(248,246,241,0.07)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(248,246,241,0.12)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(248,246,241,0.1)",
            }}
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "#C9A96A" }}>
              Client Portal Overview
            </p>
            <div className="space-y-4">
              {portalFeatures.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i + 3}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "rgba(248,246,241,0.06)", border: "1px solid rgba(248,246,241,0.08)" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(201,169,106,0.18)", border: "1px solid rgba(201,169,106,0.25)" }}
                  >
                    <item.icon size={18} style={{ color: "#C9A96A" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#F8F6F1" }}>{item.title}</p>
                    <p className="mt-1 text-sm leading-6" style={{ color: "#F8F6F199" }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services */}
        <section className="mt-24">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#C9A96A" }}
          >
            What We Offer
          </motion.p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-[24px] p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{
                  background: "rgba(248,246,241,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(248,246,241,0.09)",
                }}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(201,169,106,0.15)", border: "1px solid rgba(201,169,106,0.2)" }}
                >
                  <item.icon size={20} style={{ color: "#C9A96A" }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "#F8F6F1" }}>{item.title}</p>
                <p className="mt-2 text-sm leading-7" style={{ color: "#F8F6F180" }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-24">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-[28px] p-10"
            style={{
              background: "rgba(248,246,241,0.05)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(248,246,241,0.08)",
            }}
          >
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#C9A96A" }}>
              How It Works
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(248,246,241,0.05)", border: "1px solid rgba(248,246,241,0.07)" }}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                    style={{ background: "rgba(201,169,106,0.2)", color: "#C9A96A" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm font-semibold leading-6" style={{ color: "#F8F6F1" }}>{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Trust */}
        <section className="mt-16 grid gap-5 lg:grid-cols-3">
          {[
            { title: "Secure client portal", body: "Encrypted access and controlled permissions for your financial documents." },
            { title: "Private financial handling", body: "Your records are managed with a privacy-first process and responsible review." },
            { title: "Structured workflow system", body: "A clear workflow that keeps every step visible and organised." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-[24px] p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(248,246,241,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(248,246,241,0.08)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "#C9A96A" }}>{item.title}</p>
              <p className="mt-3 text-sm leading-7" style={{ color: "#F8F6F180" }}>{item.body}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
