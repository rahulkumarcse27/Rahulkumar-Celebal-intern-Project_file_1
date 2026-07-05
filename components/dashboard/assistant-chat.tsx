"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  ArrowUp,
  FileText,
  Paperclip,
  Quote,
  User,
} from "lucide-react";
import { Card } from "@/components/dashboard/primitives";
import { documents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Citation {
  source: string;
  page: number;
}
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  source?: string;
  citations?: Citation[];
}

const suggestions = [
  "Summarize the Q4 financial report in 3 bullets",
  "What are the renewal terms in the vendor agreement?",
  "Compare revenue across all uploaded reports",
  "List every entity mentioned in the pitch deck",
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Amara — I've indexed all 8 documents in your workspace. Ask me anything and I'll answer with citations back to the source pages.",
  },
];

function cannedAnswer(): Message {
  return {
    id: Date.now(),
    role: "assistant",
    text: "Based on the Q4 2025 Financial Report, net revenue reached $48.2M, up 23% quarter-over-quarter and $3.1M ahead of forecast. Gross margin held at 71%, while operating expenses grew a controlled 8%. The strongest contributor was the Enterprise segment, which expanded 34% year-over-year.",
    citations: [
      { source: "Q4 2025 Financial Report.pdf", page: 12 },
      { source: "Q4 2025 Financial Report.pdf", page: 27 },
    ],
  };
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const send = (text: string) => {
    const value = text.trim();
    if (!value || thinking) return;
    const selected = localStorage.getItem("selected_document");

    console.log("Assistant Selected =", selected);
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: value }]);
    setInput("");
    setThinking(true);
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }),
    );
    setLoading(true);
    console.log(
      "Selected Document:",
      localStorage.getItem("selected_document"),
    );
    console.log({
      question: value,
      filename: selected,
    });
    fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: value,
        filename: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((m) => [
          ...m,
          {
            id: Date.now(),
            role: "assistant",
            text: data.answer,
            source: data.source,
            citations: data.citations,
          },
        ]);

        setThinking(false);
        setLoading(false);

        requestAnimationFrame(() =>
          scrollRef.current?.scrollTo({
            top: 999999,
            behavior: "smooth",
          }),
        );
      })
      .catch((err) => {
        console.error(err);

        setThinking(false);
        setLoading(false);
      });
  };

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
      {/* Chat column */}
      <Card className="flex min-h-[70vh] flex-col overflow-hidden">
        <div
          ref={scrollRef}
          className="flex-1 space-y-6 overflow-y-auto p-5 md:p-6"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" && "flex-row-reverse",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  msg.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {msg.role === "assistant" ? (
                  <Sparkles className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </span>
              <div
                className={cn(
                  "max-w-[85%] space-y-2 rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-muted/60 text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                <p>{msg.text}</p>
                {msg.source && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Source: {msg.source}
                  </p>
                )}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.citations.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs"
                      >
                        <Quote className="h-3 w-3" />

                        <span className="font-medium">Page {c.page}</span>

                        <span className="text-muted-foreground">
                          {c.source}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <AnimatePresence>
            {thinking && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl bg-muted/60 px-4 py-4">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-2 rounded-full bg-muted-foreground"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3 md:px-6">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-xl border border-border bg-background px-3 py-2 text-left text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-border p-3 md:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10"
          >
            <button
              type="button"
              aria-label="Attach a document"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-accent/10 hover:text-foreground"
            >
              <Paperclip className="size-[18px]" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask about your documents…"
              className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              {loading ? (
                <span className="text-xs">...</span>
              ) : (
                <ArrowUp className="size-[18px]" />
              )}
            </button>
          </form>
          <p className="mt-2 px-1 text-center text-[11px] text-muted-foreground">
            Lumen can make mistakes. Verify important information against the
            source.
          </p>
        </div>
      </Card>

      {/* Context column */}
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Sources in context</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {documents.length} documents indexed
          </p>
          <ul className="mt-3 space-y-1.5">
            {documents.slice(0, 5).map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs transition-colors hover:bg-accent/5"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground">
                  {d.type}
                </span>
                <span className="truncate">{d.name}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-gradient-to-b from-primary/10 to-transparent p-4">
          <h3 className="text-sm font-semibold">Pro tip</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Reference a specific file with @ to scope answers to a single
            document, or ask Lumen to compare figures across your library.
          </p>
        </Card>
      </div>
    </div>
  );
}
