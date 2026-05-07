"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const quickActions = [
  "What do I upload?",
  "Check my progress",
  "Help me with documents",
  "Talk to my advisor",
];

const cannedResponses: Record<string, string> = {
  "What do I upload?":
    "Please share your latest tax forms, income statements, expense receipts, and any compliance or investment documents. We will classify them and guide you on any gaps.",
  "Check my progress":
    "Your workflow is updated in the portal. Documents are received, review is in progress, and we will mark completed items once the file review is done.",
  "Help me with documents":
    "I can help you identify missing records, confirm categories, and guide you through the upload process step by step.",
  "Talk to my advisor":
    "Your finance professional is available in the Messages section. If you need a direct consultation, the booking page has the next available slots.",
};

type Message = { role: "assistant" | "user"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "TaxFlow Assistant is here to help you organise documents, review progress, and navigate the portal with clarity." },
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const getResponse = useMemo(
    () => (text: string) =>
      cannedResponses[text] ??
      "I can help with document guidance, workflow status, and portal navigation. Please provide more details so I can assist you precisely.",
    []
  );

  const sendMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content },
      { role: "assistant", content: getResponse(content) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`w-[360px] overflow-hidden rounded-[24px] transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          background: "rgba(61,71,40,0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(201,169,106,0.2)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(248,246,241,0.08)" }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#F8F6F1" }}>TaxFlow Assistant</p>
            <p className="text-xs" style={{ color: "rgba(248,246,241,0.5)" }}>Financial workflow guide</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl border px-3 py-1 text-xs transition hover:opacity-70"
            style={{ borderColor: "rgba(248,246,241,0.15)", color: "#F8F6F1" }}
          >
            Close
          </button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                msg.role === "assistant" ? "mr-6" : "ml-6"
              }`}
              style={{
                background: msg.role === "assistant"
                  ? "rgba(248,246,241,0.07)"
                  : "rgba(201,169,106,0.15)",
                border: `1px solid ${msg.role === "assistant" ? "rgba(248,246,241,0.08)" : "rgba(201,169,106,0.25)"}`,
                color: "#F8F6F1",
              }}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="space-y-3 px-4 py-4" style={{ borderTop: "1px solid rgba(248,246,241,0.08)" }}>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((label) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                className="rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80"
                style={{
                  background: "rgba(201,169,106,0.12)",
                  border: "1px solid rgba(201,169,106,0.2)",
                  color: "#C9A96A",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); if (input.trim()) sendMessage(input.trim()); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question"
              className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none"
              style={{
                background: "rgba(248,246,241,0.07)",
                border: "1px solid rgba(248,246,241,0.1)",
                color: "#F8F6F1",
              }}
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ background: "#C9A96A", color: "#2d3318" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(201,169,106,0.4)]"
        style={{ background: "#C9A96A", color: "#2d3318", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
      >
        <Sparkles size={16} />
        TaxFlow Assistant
      </button>
    </div>
  );
}
