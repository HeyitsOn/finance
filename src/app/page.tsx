import Link from "next/link";

const serviceItems = [
  { title: "Tax preparation support", description: "Expert guidance through filing, review, and compliance." },
  { title: "Document organisation", description: "Secure classification for statements, receipts, and financial records." },
  { title: "Financial reporting", description: "Clear, structured updates on your progress and status." },
  { title: "Compliance tracking", description: "Visibility into deadlines, missing documents, and review milestones." },
];

const howItWorks = [
  "Submit your documents",
  "We review and organise them",
  "Receive structured updates and reports",
];

const trustItems = [
  "Secure client portal",
  "Private financial handling",
  "Structured workflow system",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] xl:gap-16">
          <div className="flex flex-col justify-center gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#B89B5E]">Managed finance services</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl">
              Financial Management, Made Simple
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[#6B7280]">
              A personal finance service that helps you organise, track, and manage your financial documents with clarity and confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking" className="rounded-full bg-[#B89B5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d]">
                Book Consultation
              </Link>
              <Link href="/portal" className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#F3F4F6]">
                Access Client Portal
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_50px_rgba(17,24,39,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6B7280]">Client portal overview</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-5">
                <p className="text-sm font-semibold text-[#111827]">Secure file uploads</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">Send documents safely with a minimal, trusted workflow.</p>
              </div>
              <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-5">
                <p className="text-sm font-semibold text-[#111827]">Progress tracking</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">See review stages and completion status at a glance.</p>
              </div>
              <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-5">
                <p className="text-sm font-semibold text-[#111827]">Advisor support</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">A finance professional reviews your documents and keeps you informed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          {serviceItems.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_30px_rgba(17,24,39,0.04)]">
              <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-[32px] border border-[#E5E7EB] bg-white p-10 shadow-[0_18px_50px_rgba(17,24,39,0.05)]">
          <div className="grid gap-6 sm:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step} className="space-y-3 rounded-3xl bg-[#F7F8FA] p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-[#B89B5E]">
                  {index + 1}
                </div>
                <p className="font-semibold text-[#111827]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item} className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
              <p className="text-sm font-semibold text-[#111827]">{item}</p>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                {item === "Secure client portal"
                  ? "Encrypted access and controlled permission for your financial documents."
                  : item === "Private financial handling"
                  ? "Your records are managed with a privacy-first process and responsible review."
                  : "A clear workflow that keeps every step visible and organised."}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
