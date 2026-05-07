"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AuthWrapper from "@/components/AuthWrapper";

const portalSections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "upload", label: "Upload Documents" },
  { id: "files", label: "Files" },
  { id: "messages", label: "Messages" },
  { id: "progress", label: "Progress" },
  { id: "assistant", label: "AI Assistant" },
] as const;

const fileRows = [
  { name: "2025 Tax Return.pdf", category: "Tax", status: "In review", date: "May 2" },
  { name: "Income Statement.xlsx", category: "Income", status: "Received", date: "Apr 29" },
  { name: "Expense Receipts.zip", category: "Expenses", status: "Completed", date: "Apr 25" },
];

const activityEvents = [
  { label: "Document received", detail: "Income statements uploaded.", time: "1h ago" },
  { label: "Review started", detail: "Tax package is under review.", time: "2d ago" },
  { label: "Advisor note", detail: "We may need investment reports.", time: "4d ago" },
];

const progressSteps = [
  { label: "Uploaded", value: 100 },
  { label: "In Review", value: 65 },
  { label: "Completed", value: 40 },
];

export default function PortalPage() {
  const [section, setSection] = useState<typeof portalSections[number]["id"]>("dashboard");
  const [user, setUser] = useState<any>(null);
  const [uploadCategory, setUploadCategory] = useState("Tax");
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file || !user) {
      alert("Please select a file");
      return;
    }

    setUploadLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", uploadCategory);
      formData.append("userId", user.id);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      alert("File uploaded successfully!");
      fileInput.value = "";
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_50px_rgba(17,24,39,0.05)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B89B5E]">Client Portal</p>
              <h1 className="mt-3 text-3xl font-semibold text-[#111827]">Manage documents, progress, and communication in one place.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
                Access your secure finance workspace, track review status, and get direct guidance from your advisor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#B89B5E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d]">
                Ask Assistant
              </button>
              <button className="rounded-full border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#F3F4F6]">
                Send Message
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-[28px] border border-[#E5E7EB] bg-white p-5">
            <div className="space-y-4 rounded-3xl bg-[#F7F8FA] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">Workspace</p>
              {portalSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    section === item.id
                      ? "bg-[#F7F8FA] text-[#111827] shadow-[0_8px_20px_rgba(17,24,39,0.06)]"
                      : "text-[#6B7280] hover:bg-[#F3F4F6]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#B89B5E]">›</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            {section === "dashboard" && (
              <div className="grid gap-6 xl:grid-cols-3">
                {[
                  { label: "Documents Received", value: "18" },
                  { label: "In Review", value: "5" },
                  { label: "Completed", value: "12" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_40px_rgba(17,24,39,0.04)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280]">{item.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-[#111827]">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">Your advisor is processing the next items in the workflow.</p>
                  </div>
                ))}
              </div>
            )}

            {section === "dashboard" && (
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827]">Recent Activity</h2>
                    <p className="mt-2 text-sm text-[#6B7280]">Latest updates from your finance team and document workflow.</p>
                  </div>
                  <span className="rounded-full bg-[#F7F8FA] px-3 py-1 text-xs font-semibold text-[#6B7280]">Live</span>
                </div>
                <div className="space-y-4">
                  {activityEvents.map((event) => (
                    <div key={event.label} className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-[#111827]">{event.label}</p>
                        <span className="text-sm text-[#6B7280]">{event.time}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6B7280]">{event.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "upload" && (
              <div className="space-y-6">
                <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                  <h2 className="text-lg font-semibold text-[#111827]">Upload Documents</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Drag and drop files or select documents from your device. We will classify them as tax, income, or expense records.
                  </p>
                  <div className="mt-6 rounded-3xl border border-dashed border-[#E5E7EB] bg-[#F7F8FA] p-8 text-center">
                    <p className="text-sm font-semibold text-[#111827]">Drop files here to upload</p>
                    <p className="mt-2 text-sm text-[#6B7280]">Accepted formats: PDF, XLSX, JPG, PNG</p>
                    <button className="mt-5 rounded-full bg-[#B89B5E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a3864d]">
                      Browse documents
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Tax", detail: "Returns, forms, filings" },
                    { label: "Income", detail: "Statements, payroll, invoices" },
                    { label: "Expenses", detail: "Receipts, bills, statements" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-[#E5E7EB] bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280]">{item.label}</p>
                      <p className="mt-3 text-sm leading-6 text-[#6B7280]">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "files" && (
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827]">Files</h2>
                    <p className="mt-2 text-sm text-[#6B7280]">Review your uploaded financial documents and track their status.</p>
                  </div>
                  <span className="rounded-full bg-[#F7F8FA] px-3 py-1 text-xs font-semibold text-[#6B7280]">{fileRows.length} items</span>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB]">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#F7F8FA] text-[#6B7280]">
                      <tr>
                        <th className="px-4 py-4">File name</th>
                        <th className="px-4 py-4">Category</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Date uploaded</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileRows.map((file) => (
                        <tr key={file.name} className="border-t border-[#E5E7EB]">
                          <td className="px-4 py-4 text-[#111827]">{file.name}</td>
                          <td className="px-4 py-4 text-[#6B7280]">{file.category}</td>
                          <td className="px-4 py-4 text-[#111827]">{file.status}</td>
                          <td className="px-4 py-4 text-[#6B7280]">{file.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {section === "messages" && (
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                <h2 className="text-lg font-semibold text-[#111827]">Messages</h2>
                <p className="mt-2 text-sm text-[#6B7280]">Human communication with your finance advisor is kept here.</p>
                <div className="mt-6 space-y-4">
                  {[
                    { sender: "Advisor", message: "Please upload any missing expense receipts by Friday.", time: "Today, 10:15 AM" },
                    { sender: "You", message: "I uploaded the latest statements to the portal.", time: "Yesterday, 4:10 PM" },
                  ].map((item) => (
                    <div key={item.time} className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-[#111827]">{item.sender}</p>
                        <span className="text-xs text-[#6B7280]">{item.time}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#6B7280]">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "progress" && (
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                <h2 className="text-lg font-semibold text-[#111827]">Workflow Progress</h2>
                <p className="mt-2 text-sm text-[#6B7280]">Your documents move through a clear, simple workflow.</p>
                <div className="mt-6 space-y-5">
                  {progressSteps.map((step) => (
                    <div key={step.label}>
                      <div className="flex items-center justify-between text-sm font-medium text-[#111827]">
                        <span>{step.label}</span>
                        <span className="text-[#6B7280]">{step.value}%</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#F3F4F6]">
                        <div className="h-full rounded-full bg-[#B89B5E]" style={{ width: `${step.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "assistant" && (
              <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827]">AI Assistant</h2>
                    <p className="mt-2 text-sm text-[#6B7280]">A financial workflow guide built to support your portal experience.</p>
                  </div>
                  <span className="rounded-full bg-[#F7F8FA] px-3 py-1 text-xs font-semibold text-[#6B7280]">Structured responses</span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-[#F7F8FA] p-5">
                    <p className="text-sm font-semibold text-[#111827]">What do I upload?</p>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Share recent tax forms, pay statements, invoices, receipts, and any financial records relevant to your current filing period.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-[#F7F8FA] p-5">
                    <p className="text-sm font-semibold text-[#111827]">Show financial progress</p>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Your portal progress updates from uploaded to review and completion. Check the progress tab for final status.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-[#F7F8FA] p-5">
                    <p className="text-sm font-semibold text-[#111827]">Help me with documents</p>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      I can help identify missing categories, confirm acceptable file types, and explain what your advisor needs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
