"use client";

import { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  FileSearch,
  Upload,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import {
  Card,
  StatusBadge,
  FileTypeChip,
} from "@/components/dashboard/primitives";
type DocStatus = "processed" | "processing" | "queued" | "failed";
import { cn } from "@/lib/utils";

const filters: { label: string; value: "all" | DocStatus }[] = [
  { label: "All", value: "all" },
  { label: "Processed", value: "processed" },
  { label: "Processing", value: "processing" },
  { label: "Queued", value: "queued" },
  { label: "Failed", value: "failed" },
];

export function DocumentsView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DocStatus>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [docPreview, setDocPreview] = useState("");
  const [docSummary, setDocSummary] = useState("");
  const [docStats, setDocStats] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch(console.error);
  }, []);

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);
      const docs = await fetch("http://localhost:8000/documents");
      const newDocs = await docs.json();

      setDocuments(newDocs);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  const deleteFile = async (filename: string) => {
    const ok = confirm(`Delete ${filename}?`);

    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:8000/documents/${filename}`, {
        method: "DELETE",
      });

      const data = await res.json();

      alert(data.message);

      setDocuments((prev) => prev.filter((doc) => doc.name !== filename));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };
  const askAI = async () => {
    if (!question.trim()) return;

    setLoadingAnswer(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          context: docPreview,
        }),
      });

      const data = await res.json();

      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong.");
    }

    setLoadingAnswer(false);
  };
  const totalPages = documents.reduce((sum, doc) => sum + doc.pages, 0);

  const pdfCount = documents.filter((doc) => doc.type === "PDF").length;

  const totalStorage = documents.reduce(
    (sum, doc) => sum + parseFloat(doc.size),
    0,
  );
  const filtered = useMemo(() => {
    let result = documents.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = filter === "all" || d.status === filter;

      return matchesQuery && matchesFilter;
    });

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.uploaded_at_iso).getTime() -
            new Date(a.uploaded_at_iso).getTime(),
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.uploaded_at_iso).getTime() -
            new Date(b.uploaded_at_iso).getTime(),
        );
        break;

      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "largest":
        result.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
        break;

      case "smallest":
        result.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
        break;
    }

    return result;
  }, [documents, query, filter, sortBy]);
  return (
    <div className="flex flex-col gap-5">
      {/* Upload dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card/60 px-6 py-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/[0.03]"
      >
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <Upload className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium">
            Drop files here or{" "}
            <span className="text-primary">browse to upload</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, DOCX, XLSX, PNG up to 100 MB. Lumen auto-extracts text, tables
            and entities.
          </p>
        </div>
        <input
          key={documents.length}
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={async (e) => {
            if (!e.target.files) return;

            const files = Array.from(e.target.files);

            for (const file of files) {
              await uploadFile(file);
            }

            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
        >
          Select File
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Documents</p>

          <h2 className="text-3xl font-bold mt-2">{documents.length}</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Storage</p>

          <h2 className="text-3xl font-bold mt-2">
            {totalStorage.toFixed(2)} MB
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Total Pages</p>

          <h2 className="text-3xl font-bold mt-2">{totalPages}</h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">PDF Files</p>

          <h2 className="text-3xl font-bold mt-2">{pdfCount}</h2>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents…"
            className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg transition-colors",
                view === "grid"
                  ? "bg-accent/15 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutGrid className="size-[18px]" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg transition-colors",
                view === "list"
                  ? "bg-accent/15 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">Name A-Z</option>
          <option value="za">Name Z-A</option>
          <option value="largest">Largest Size</option>
          <option value="smallest">Smallest Size</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <FileSearch className="size-6" />
          </span>
          <p className="text-sm font-medium">No documents found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
          </p>
        </Card>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <div
                onClick={async () => {
                  setSelectedDoc(doc);
                  localStorage.setItem("selected_document", doc.name);
                  console.log("Saved =", doc.name);

                  console.log(
                    "Storage =",
                    localStorage.getItem("selected_document"),
                  );

                  setShowDetails(true);

                  const res = await fetch(
                    `http://127.0.0.1:8000/documents/details/${doc.name}`,
                  );

                  const data = await res.json();

                  setDocPreview(data.preview);

                  setDocSummary(data.summary);
                  setDocStats(data);
                }}
              >
                <Card className="flex h-full cursor-pointer flex-col gap-4 p-5 transition-shadow hover:shadow-md hover:shadow-black/[0.05]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileTypeChip type={doc.type} />
                      <StatusBadge status={doc.status} />
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Preview */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          window.open(
                            `http://127.0.0.1:8000/documents/view/${encodeURIComponent(doc.name)}`,
                            "_blank",
                          );
                        }}
                        className="rounded-lg p-2 text-green-500 hover:bg-green-50"
                      >
                        <Eye size={16} />
                      </button>

                      {/* Download */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          window.open(
                            `http://127.0.0.1:8000/documents/download/${encodeURIComponent(doc.name)}`,
                          );
                        }}
                        className="rounded-lg p-2 text-blue-500 hover:bg-blue-50"
                      >
                        <Download size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(doc.name);
                        }}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">
                      {doc.name}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {doc.pages} pages · {doc.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">
                        {doc.type}
                      </span>
                    </div>
                    <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                      {doc.uploaded_at}
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_120px_120px_40px] gap-4 border-b border-border px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
            <span>Name</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Updated</span>
            <span className="sr-only">Actions</span>
          </div>
          <ul className="divide-y divide-border">
            {filtered.map((doc) => (
              <li
                key={doc.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 transition-colors hover:bg-accent/5 md:grid-cols-[minmax(0,1fr)_120px_120px_120px_40px]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileTypeChip type={doc.type} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.pages} pages · {doc.size}
                    </p>
                  </div>
                </div>
                <span className="hidden truncate text-sm text-muted-foreground md:block">
                  --
                </span>
                <div className="hidden md:block">
                  <StatusBadge status={doc.status} />
                </div>
                <span className="hidden text-xs text-muted-foreground md:block">
                  {doc.uploaded_at}
                </span>
                <button
                  type="button"
                  aria-label="More actions"
                  className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {showDetails && selectedDoc && (
        <div className="fixed right-0 top-0 z-50 h-screen w-[420px] border-l bg-background p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Document Details</h2>

            <button
              onClick={() => setShowDetails(false)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <h3 className="font-semibold break-all">{selectedDoc.name}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <h3>{selectedDoc.type}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Pages</p>
              <h3>{selectedDoc.pages}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Size</p>
              <h3>{selectedDoc.size}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Uploaded</p>

              <h3>{selectedDoc.uploaded_at}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>

              <span className="rounded bg-green-500/20 px-3 py-1 text-green-400">
                {selectedDoc.status}
              </span>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">AI Summary</h3>

              <p className="text-sm text-muted-foreground">
                {docSummary || "Loading..."}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Words</p>
                <p className="font-semibold">{docStats?.words ?? "-"}</p>
              </div>

              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Reading Time</p>
                <p className="font-semibold">
                  {docStats?.reading_time ?? "-"} min
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Language</p>
                <p className="font-semibold">{docStats?.language ?? "-"}</p>
              </div>

              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Characters</p>
                <p className="font-semibold">{docStats?.characters ?? "-"}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Keywords</h3>

              <div className="flex flex-wrap gap-2">
                {docStats?.keywords?.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Text Preview</h3>

              <div className="max-h-64 overflow-y-auto rounded-lg border p-3 text-sm text-muted-foreground">
                {docPreview || "Loading..."}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Ask AI</h3>

              <textarea
                className="w-full rounded-lg border bg-transparent p-3 text-sm"
                rows={3}
                placeholder="Ask anything about this document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <button
                className="mt-3 w-full rounded-lg bg-violet-600 p-2 text-white"
                onClick={askAI}
              >
                Ask AI
              </button>

              {answer && (
                <div className="mt-4 rounded-lg border p-3 text-sm">
                  {answer}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
