export default function BookingPage() {
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-[0_12px_24px_rgba(17,24,39,0.05)]">
                <p className="text-sm font-semibold text-[#111827]">Next Available</p>
                <p className="mt-3 text-lg font-semibold text-[#111827]">Tuesday, May 14</p>
                <p className="mt-1 text-sm text-[#6B7280]">2:00 PM - 2:45 PM</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-[0_12px_24px_rgba(17,24,39,0.05)]">
                <p className="text-sm font-semibold text-[#111827]">Consultation Type</p>
                <p className="mt-3 text-lg font-semibold text-[#111827]">Document review & planning</p>
                <p className="mt-1 text-sm text-[#6B7280]">Secure call with your advisor.</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-[0_12px_24px_rgba(17,24,39,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280]">My calendar</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "May 14",
                  "May 16",
                  "May 18",
                ].map((date) => (
                  <div key={date} className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-5 text-center">
                    <p className="text-sm font-semibold text-[#111827]">{date}</p>
                    <p className="mt-2 text-xs text-[#6B7280]">Available</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#111827]">Ready to reserve your slot?</p>
                <p className="text-sm text-[#6B7280]">A simple consultation sets the next milestone for your tax workflow.</p>
              </div>
              <button className="rounded-full bg-[#B89B5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d]">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
