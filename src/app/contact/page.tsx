export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-10 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B89B5E]">Contact</p>
            <h1 className="text-3xl font-semibold text-[#111827]">We are available to support your financial workflow.</h1>
            <p className="text-sm leading-7 text-[#6B7280]">
              Send a message and your advisor will follow up with the next steps for documents, tax planning, and portal navigation.
            </p>
          </div>

          <form className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-[#111827]">
                Name
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
                />
              </label>
              <label className="space-y-2 text-sm text-[#111827]">
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
                />
              </label>
            </div>
            <label className="space-y-2 text-sm text-[#111827]">
              Message
              <textarea
                rows={6}
                placeholder="Tell us how we can help"
                className="w-full rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-3 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
              />
            </label>
            <button className="rounded-full bg-[#B89B5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
