import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function RespuestaMarkdown({ texto }: { texto: string }) {
  return (
    <div className="prose-aria max-w-none text-sm leading-relaxed text-ink">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (p) => <h2 className="mb-2 mt-4 font-display text-lg font-semibold text-ink first:mt-0" {...p} />,
          h3: (p) => <h3 className="mb-1.5 mt-3 font-display text-base font-semibold text-ink" {...p} />,
          p: (p) => <p className="mb-2 text-ink/90" {...p} />,
          strong: (p) => <strong className="font-semibold text-ink" {...p} />,
          ul: (p) => <ul className="mb-2 ml-4 list-disc space-y-0.5" {...p} />,
          ol: (p) => <ol className="mb-2 ml-4 list-decimal space-y-0.5" {...p} />,
          blockquote: (p) => (
            <blockquote
              className="mb-2 border-l-2 border-ink/15 pl-3 font-doc italic text-ink/60"
              {...p}
            />
          ),
          code: (p) => (
            <code className="rounded bg-ink/5 px-1 py-0.5 font-mono text-[13px]" {...p} />
          ),
          table: (p) => (
            <div className="mb-3 overflow-x-auto rounded-lg border border-ink/10">
              <table className="w-full border-collapse text-xs" {...p} />
            </div>
          ),
          thead: (p) => <thead className="bg-paper-dim" {...p} />,
          th: (p) => (
            <th className="border-b border-ink/10 px-2.5 py-1.5 text-left font-mono text-[11px] uppercase tracking-wide text-ink/50" {...p} />
          ),
          td: (p) => <td className="border-b border-ink/5 px-2.5 py-1.5 align-top" {...p} />,
          hr: () => <hr className="my-4 border-ink/10" />,
        }}
      >
        {texto}
      </ReactMarkdown>
    </div>
  );
}
