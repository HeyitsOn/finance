"use client";

import { useState } from "react";

export default function BookingPage() {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, date, time }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book consultation");
      }

      setSuccess(true);
      setEmail("");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-10 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B89B5E]">Booking</p>
            <h1 className="text-3xl font-semibold text-[#111827]">Schedule your consultation with a finance professional.</h1>
            <p className="text-sm leading-7 text-[#6B7280]">
              Choose a convenient time to review your documents and discuss the next steps in your financial workflow.
            </p>
          </div>

          <div className="mt-10 space-y-8 rounded-[28px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-[#111827]">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
                  />
                </label>
                <label className="space-y-2 text-sm text-[#111827]">
                  Preferred Date
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm text-[#111827]">
                Preferred Time
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">Booking confirmed! We'll send a confirmation email shortly.</p>}
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#B89B5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d] disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Consultation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
