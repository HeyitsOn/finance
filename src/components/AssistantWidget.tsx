"use client";

import { useMemo, useState } from "react";

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

type Message = {
  role: "assistant" | "user";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "TaxFlow Assistant is here to help you organise documents, review progress, and navigate the portal with clarity.",
  },
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const lastMessage = messages[messages.length - 1];

  const response = useMemo(
    () => (text: string) => {
      if (cannedResponses[text]) {
        return cannedResponses[text];
      }
      return (
        "I can help with document guidance, workflow status, and portal navigation. " +
        "Please provide more details so I can assist you precisely."
      );
    },
    []
  );

  const sendMessage = (content: string) => {
    const userMessage = { role: "user" as const, content };
    const assistantMessage = { role: "assistant" as const, content: response(content) };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`w-[360px] rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_24px_50px_rgba(17,24,39,0.08)] transition duration-200 ${
          open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="flex items-center justify-between rounded-[28px_28px_0_0] border-b border-[#E5E7EB] bg-[#F7F8FA] px-4 py-4">
          <div>
            <p className="text-sm font-semibold text-[#111827]">TaxFlow Assistant</p>
            <p className="text-xs text-[#6B7280]">Financial workflow guide</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#111827] transition hover:bg-[#F3F4F6]"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="max-h-96 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-3xl px-4 py-3 ${
                message.role === "assistant"
                  ? "bg-[#F7F8FA] text-[#111827]"
                  : "bg-white text-[#111827] self-end border border-[#E5E7EB]"
              }`}
            >
              <p className="text-sm leading-6">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t border-[#E5E7EB] bg-white px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => sendMessage(label)}
                className="rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-3 py-1 text-xs font-medium text-[#111827] transition hover:bg-[#E5E7FA]"
              >
                {label}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (input.trim()) {
                sendMessage(input.trim());
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question"
              className="min-w-0 flex-1 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#B89B5E]"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#B89B5E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a3864d]"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-[0_12px_30px_rgba(17,24,39,0.12)] transition hover:shadow-[0_16px_40px_rgba(17,24,39,0.16)]"
      >
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#B89B5E]" />
        TaxFlow Assistant
      </button>
    </div>
  );
}
