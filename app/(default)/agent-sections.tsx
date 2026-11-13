"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  Code,
  Copy,
  Download,
  FileCode,
  Globe,
  Hexagon,
  Layers,
  Link2,
  LogIn,
  MessageSquare,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Single place for outbound links used by the agent-positioning sections.
// Slugs match the "AI agents" section in sendforsign-docs (branch docs/ai-agents).
const DOCS = "https://about.sendforsign.com";
export const APP_URL = "https://app.sendforsign.com";
export const DOCS_AGENTS_URL = `${DOCS}/ai-agents/overview`;
export const DOCS_MCP_QUICKSTART_URL = `${DOCS}/ai-agents/mcp-quickstart`;
export const DOCS_SKILLS_URL = `${DOCS}/ai-agents/skills`;
export const DOCS_PROMPTS_URL = `${DOCS}/ai-agents/prompts`;
export const DOCS_API_URL = `${DOCS}/api-reference/introapi`;
export const CONTACT_URL = "mailto:hello@sendforsign.com";

// Pricing is a hypothesis (platform fee + per-contract usage, free sandbox).
// Leave `price` null until real numbers are approved; the card then shows
// `fallback` instead of a figure.
const PRICING: {
  name: string;
  price: string | null;
  unit?: string;
  fallback: string;
  blurb: string;
  items: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
}[] = [
  {
    name: "Sandbox",
    price: "Free",
    fallback: "Free",
    blurb: "Run the whole flow before you ship.",
    items: [
      "Templates, fields, recipients, signing",
      "Test recipients and webhooks",
      "REST API and MCP server",
    ],
    cta: { label: "Get API key", href: APP_URL },
  },
  {
    name: "Platform",
    price: null,
    unit: "/ month",
    fallback: "Monthly platform fee",
    blurb: "For products that embed contracts for their own customers.",
    items: [
      "Tenants per customer (userKey)",
      "Your brand on emails and signing pages",
      "Embeddable React components and webhooks",
      "Agent modes, confirmations and audit log",
    ],
    cta: { label: "Talk to us", href: CONTACT_URL },
    highlight: true,
  },
  {
    name: "Usage",
    price: null,
    unit: "/ contract sent",
    fallback: "Per contract sent",
    blurb: "Pay for contracts that go out for signature.",
    items: [
      "No per-seat fees",
      "No per-agent fees",
      "Drafts and reads are not billed",
    ],
    cta: { label: "Talk to us", href: CONTACT_URL },
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Connecting an agent. Two ways:
//  - sign-in (OAuth 2.1 + dynamic client registration): one URL, no keys;
//  - API key headers, for integrators whose agents run server-side.
// Header snippets are kept in sync with sendforsign-docs ai-agents/mcp-quickstart.
// ---------------------------------------------------------------------------

export const MCP_URL = "https://api.sendforsign.com/mcp";

// Install link formats checked against the official docs (2026-11):
// Cursor: cursor.com/docs/mcp/install-links -> name + base64(JSON config)
// VS Code: code.visualstudio.com/api/extension-guides/ai/mcp -> urlencoded JSON with name
const CURSOR_INSTALL_URL =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=sendforsign&config=eyJ1cmwiOiJodHRwczovL2FwaS5zZW5kZm9yc2lnbi5jb20vbWNwIn0=";
const VSCODE_INSTALL_URL =
  "vscode:mcp/install?%7B%22name%22%3A%22sendforsign%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.sendforsign.com%2Fmcp%22%7D";

type Snippet = { file: string; code: string };

type Integration = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  steps?: React.ReactNode[];
  snippet?: Snippet;
  install?: { label: string; href: string };
};

const UrlCode = () => (
  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white">
    {MCP_URL}
  </code>
);

const OAUTH_INTEGRATIONS: Integration[] = [
  {
    id: "claude",
    label: "Claude",
    icon: MessageSquare,
    steps: [
      <>Settings → Connectors → Add custom connector</>,
      <>
        Paste <UrlCode />
      </>,
      <>Sign in to Sendforsign and pick what the agent may do</>,
    ],
  },
  {
    id: "claude-code",
    label: "Claude Code",
    icon: Terminal,
    snippet: {
      file: "terminal",
      code: `claude mcp add --transport http sendforsign ${MCP_URL}

# then, inside Claude Code, sign in:
/mcp`,
    },
  },
  {
    id: "cursor",
    label: "Cursor",
    icon: MousePointerClick,
    install: { label: "Add to Cursor", href: CURSOR_INSTALL_URL },
    steps: [
      <>Click Add to Cursor and confirm the install</>,
      <>Sign in to Sendforsign when Cursor asks</>,
    ],
  },
  {
    id: "vscode",
    label: "VS Code",
    icon: Code,
    install: { label: "Add to VS Code", href: VSCODE_INSTALL_URL },
    steps: [
      <>Click Add to VS Code and review the server</>,
      <>Install, then sign in to Sendforsign</>,
    ],
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: Sparkles,
    steps: [
      <>Settings → Apps &amp; Connectors → turn on developer mode</>,
      <>
        Create a connector with <UrlCode />
      </>,
      <>Sign in to Sendforsign and pick what the agent may do</>,
    ],
  },
  {
    id: "openai",
    label: "OpenAI Agents SDK",
    icon: Bot,
    steps: [
      <>
        Point a hosted or Streamable HTTP MCP tool at <UrlCode />
      </>,
      <>OAuth 2.1 with dynamic client registration, no keys to manage</>,
    ],
  },
  {
    id: "any",
    label: "Any MCP client",
    icon: Braces,
    snippet: {
      file: "mcp.json",
      code: `{
  "mcpServers": {
    "sendforsign": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}

// OAuth 2.1 + dynamic client registration.
// The client opens the Sendforsign sign-in on first use.`,
    },
  },
];

const KEY_INTEGRATIONS: Integration[] = [
  {
    id: "key-claude-code",
    label: "Claude Code",
    icon: Terminal,
    snippet: {
      file: "terminal",
      code: `claude mcp add --transport http sendforsign ${MCP_URL} \\
  --header "X-Sendforsign-Key: YOUR_API_KEY" \\
  --header "X-Sendforsign-Client-Key: YOUR_CLIENT_KEY"`,
    },
  },
  {
    id: "key-json",
    label: "MCP JSON",
    icon: Braces,
    snippet: {
      file: "mcp.json",
      code: `{
  "mcpServers": {
    "sendforsign": {
      "type": "http",
      "url": "${MCP_URL}",
      "headers": {
        "X-Sendforsign-Key": "YOUR_API_KEY",
        "X-Sendforsign-Client-Key": "YOUR_CLIENT_KEY",
        "X-Sendforsign-Agent-Mode": "draft"
      }
    }
  }
}`,
    },
  },
  {
    id: "key-curl",
    label: "REST / cURL",
    icon: Globe,
    snippet: {
      file: "terminal",
      code: `curl -X POST 'https://api.sendforsign.com/api/contract' \\
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "data": {
      "action": "create",
      "clientKey": "YOUR_CLIENT_KEY",
      "contract": {
        "name": "Mutual NDA - Acme Ltd",
        "templateKey": "TEMPLATE_KEY"
      }
    }
  }'`,
    },
  },
  {
    id: "key-node",
    label: "Node.js",
    icon: Hexagon,
    snippet: {
      file: "contract.mjs",
      code: `const res = await fetch("https://api.sendforsign.com/api/contract", {
  method: "POST",
  headers: {
    "X-Sendforsign-Key": process.env.SENDFORSIGN_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    data: {
      action: "create",
      clientKey: process.env.SENDFORSIGN_CLIENT_KEY,
      contract: { name: "Mutual NDA - Acme Ltd", templateKey: "TEMPLATE_KEY" },
    },
  }),
});
const { contract } = await res.json();`,
    },
  },
  {
    id: "key-python",
    label: "Python",
    icon: FileCode,
    snippet: {
      file: "contract.py",
      code: `import os, requests

res = requests.post(
    "https://api.sendforsign.com/api/contract",
    headers={"X-Sendforsign-Key": os.environ["SENDFORSIGN_API_KEY"]},
    json={
        "data": {
            "action": "create",
            "clientKey": os.environ["SENDFORSIGN_CLIENT_KEY"],
            "contract": {"name": "Mutual NDA - Acme Ltd", "templateKey": "TEMPLATE_KEY"},
        }
    },
)
contract = res.json()["contract"]`,
    },
  },
];

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500);
    } catch {
      // clipboard unavailable (insecure context); the text stays selectable
    }
  };
  return { copied, copy };
}

function CopyButton({
  copied,
  onClick,
  label,
}: {
  copied: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 transition hover:bg-white/10"
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-300" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({
  snippet,
  copied,
  onCopy,
}: {
  snippet: Snippet;
  copied: boolean;
  onCopy: () => void;
}) {
  const lines = snippet.code.split("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="truncate rounded-md bg-white/10 px-2 py-0.5 font-mono text-[12px] text-white/80">
            {snippet.file}
          </span>
        </div>
        <CopyButton copied={copied} onClick={onCopy} label={`Copy ${snippet.file}`} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
        <code className="grid">
          {lines.map((line, i) => (
            <span key={i} className="flex">
              <span
                aria-hidden
                className="mr-4 inline-block w-6 shrink-0 select-none text-right text-white/25"
              >
                {i + 1}
              </span>
              <span className="whitespace-pre">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function InstallButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}

const CONSENT_STEPS = [
  { icon: Link2, title: "Paste link", text: "In Claude, ChatGPT, Cursor…" },
  { icon: LogIn, title: "Sign in", text: "Pick account and tenant" },
  { icon: ShieldCheck, title: "Pick mode", text: null },
];

function ConsentSteps() {
  return (
    <ol className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
      {CONSENT_STEPS.map((s, i) => (
        <li
          key={s.title}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-neutral-950/80 p-3 backdrop-blur-md"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <s.icon className="h-3.5 w-3.5 text-white/60" />
              {s.title}
            </p>
            {s.text ? (
              <p className="mt-0.5 text-xs text-zinc-400">{s.text}</p>
            ) : (
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="rounded-md bg-emerald-400/15 px-1.5 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-400/30">
                  Drafts only · default
                </span>
                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[11px] text-white/60 ring-1 ring-white/10">
                  Can send
                </span>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function IntegrationSection() {
  const [mode, setMode] = useState<"oauth" | "key">("oauth");
  const list = mode === "oauth" ? OAUTH_INTEGRATIONS : KEY_INTEGRATIONS;
  const [activeId, setActiveId] = useState<Record<string, string>>({
    oauth: OAUTH_INTEGRATIONS[0].id,
    key: KEY_INTEGRATIONS[0].id,
  });
  const current = list.find((i) => i.id === activeId[mode]) ?? list[0];
  const { copied, copy } = useCopy();

  return (
    <section
      id="agents"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <Eyebrow>
          <Bot className="h-4 w-4 text-emerald-400" />
          MCP server
        </Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Connect your agent in a minute
        </h2>
      </div>

      {/* The one thing to copy */}
      <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-white/20 bg-neutral-950/90 p-2 pl-5 backdrop-blur-md sm:pl-6">
        <span className="min-w-0 flex-1 truncate font-mono text-base text-white sm:text-xl">
          {MCP_URL}
        </span>
        <button
          type="button"
          onClick={() => copy("mcp-url", MCP_URL)}
          aria-label="Copy MCP server URL"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
        >
          {copied === "mcp-url" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied === "mcp-url" ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mx-auto mt-4 max-w-xl text-center text-slate-300">
        Paste it into your AI app, sign in to Sendforsign, choose what the agent
        may do. That&apos;s it.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <InstallButton label="Add to Cursor" href={CURSOR_INSTALL_URL} />
        <InstallButton label="Add to VS Code" href={VSCODE_INSTALL_URL} />
      </div>

      <ConsentSteps />

      {/* Per-client details */}
      <div className="mt-14 flex justify-center">
        <div
          role="tablist"
          aria-label="How to connect"
          className="inline-flex rounded-full border border-white/10 bg-neutral-950/80 p-1 text-sm backdrop-blur-md"
        >
          {(
            [
              ["oauth", "Sign in (recommended)"],
              ["key", "For your own servers (API key)"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={
                "rounded-full px-3 py-1.5 transition sm:px-4 " +
                (mode === id
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {mode === "key" && (
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-400">
          For agents that run on your backend without a person to sign in.
          Mode and allowed domains come from headers.
        </p>
      )}

      <div
        role="tablist"
        aria-label="Choose your client"
        className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {list.map((it) => {
          const on = it.id === current.id;
          return (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActiveId((s) => ({ ...s, [mode]: it.id }))}
              className={
                "flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm transition " +
                (on
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/10 bg-neutral-950/80 text-white/60 hover:border-white/20 hover:text-white/90")
              }
            >
              <it.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{it.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-950/90 p-4 backdrop-blur-md sm:p-5">
        {current.steps && (
          <ol className="space-y-2">
            {current.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-white/70">
                  {i + 1}
                </span>
                <span className="min-w-0 break-words">{s}</span>
              </li>
            ))}
          </ol>
        )}
        {current.install && (
          <div className="mt-4">
            <InstallButton {...current.install} />
          </div>
        )}
        {current.snippet && (
          <div className={current.steps ? "mt-4" : ""}>
            <CodeBlock
              snippet={current.snippet}
              copied={copied === current.id}
              onCopy={() => copy(current.id, current.snippet!.code)}
            />
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-3 text-sm">
          <a
            href={DOCS_MCP_QUICKSTART_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white"
          >
            MCP quickstart <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={DOCS_SKILLS_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white"
          >
            Agent skill <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Differentiators: one line each, plus a tiny visual instead of bullets.
// ---------------------------------------------------------------------------

function Chip({ who, children }: { who: "agent" | "party"; children: React.ReactNode }) {
  return (
    <span
      className={
        "mx-0.5 inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ring-1 " +
        (who === "agent"
          ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30"
          : "bg-sky-400/10 text-sky-300 ring-sky-400/30")
      }
    >
      {children}
    </span>
  );
}

function FieldRolesVisual() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-[13px] leading-7 text-white/60">
      Agreement between <Chip who="agent">Studio Nord</Chip> and{" "}
      <Chip who="party">Client company</Chip> for a fee of{" "}
      <Chip who="agent">€2,400</Chip>, signed by <Chip who="party">Full name</Chip>.
      <div className="mt-3 flex gap-4 text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Agent
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-400" /> Counterparty
        </span>
      </div>
    </div>
  );
}

const TENANTS = [
  { name: "acme", dot: "bg-orange-400", btn: "bg-orange-400 text-black" },
  { name: "studio", dot: "bg-violet-400", btn: "bg-violet-400 text-black" },
  { name: "yourbrand", dot: "bg-emerald-400", btn: "bg-emerald-400 text-black" },
];

function TenantsVisual() {
  return (
    <div className="space-y-2">
      {TENANTS.map((t) => (
        <div
          key={t.name}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2"
        >
          <span className="flex items-center gap-2 text-sm text-white/80">
            <span className={"h-3 w-3 rounded-sm " + t.dot} />
            {t.name}
          </span>
          <span className={"rounded-md px-3 py-1 text-[11px] font-semibold " + t.btn}>
            Sign
          </span>
        </div>
      ))}
    </div>
  );
}

const AUDIT_ROWS = [
  { agent: "intake", action: "create_contract", ok: true },
  { agent: "intake", action: "send_for_signature", ok: true },
  { agent: "intake", action: "send → gmail.com", ok: false },
];

function AuditVisual() {
  return (
    <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-black/40 font-mono text-[11px]">
      {AUDIT_ROWS.map((r) => (
        <div key={r.action} className="flex items-center gap-2 px-3 py-2">
          <span className="text-white/50">{r.agent}</span>
          <span className="text-white/30">·</span>
          <span className="min-w-0 break-all text-white/80">{r.action}</span>
          <span className="ml-auto shrink-0">
            {r.ok ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-red-300">
                blocked
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Fields know who fills them",
    text: "The agent fills its fields. The counterparty fills theirs.",
    visual: FieldRolesVisual,
  },
  {
    icon: Layers,
    title: "Your brand, every tenant",
    text: "Each of your customers gets their own branded contracts.",
    visual: TenantsVisual,
  },
  {
    icon: ShieldCheck,
    title: "Every agent action logged",
    text: "Modes, send confirmations and an audit log per agent.",
    visual: AuditVisual,
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Why Sendforsign
        </Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Built for agents and the people they work for
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {DIFFERENTIATORS.map((d) => (
          <div
            key={d.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-neutral-950/80 p-6 backdrop-blur-md"
          >
            <d.icon className="mb-4 h-5 w-5 text-white/80" />
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {d.title}
            </h3>
            <p className="mb-5 mt-1 text-sm text-zinc-400">{d.text}</p>
            <div className="mt-auto">
              <d.visual />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-zinc-500">
        Simple electronic signatures for the EU and the US, with an audit
        trail on every contract and every agent action.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Prompts that work once the MCP server is connected.
// ---------------------------------------------------------------------------

const PROMPTS = [
  {
    text: "Create an NDA from my 'Mutual NDA' template for Acme Ltd, fill in our side, add jane@acme.com as signer and show me before sending.",
    tools: ["get_template", "create_contract", "add_recipients"],
  },
  {
    text: "Which contracts are still waiting for signature this week? Remind me who hasn't signed.",
    tools: ["list_contracts", "list_recipients"],
  },
  {
    text: "Turn this proposal into a contract, let the client fill their company details, and give me the signing link instead of emailing it.",
    tools: ["create_contract", "fill_placeholders", "add_recipients"],
  },
  {
    text: "Download the signed PDF of the Acme NDA.",
    tools: ["list_contracts", "download_contract_pdf"],
  },
  {
    text: "For each new customer in this list, create a tenant and send our standard service agreement (ask me before sending).",
    tools: ["create_user", "create_contract", "send_for_signature"],
  },
  {
    text: "What happened with the Studio Nord contract? Show me the timeline.",
    tools: ["get_contract", "get_contract_timeline"],
  },
];

export function PromptsSection() {
  const { copied, copy } = useCopy();
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Eyebrow>
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          For Claude, ChatGPT and Cursor
        </Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Prompts that just work
        </h2>
        <p className="text-lg text-slate-300">
          Connect the MCP server, then paste one of these.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROMPTS.map((p, i) => {
          const id = `prompt-${i}`;
          return (
            <div
              key={id}
              className="flex flex-col rounded-2xl border border-white/10 bg-neutral-950/80 p-5 backdrop-blur-md"
            >
              <p className="text-[15px] leading-relaxed text-white/90">
                &ldquo;{p.text}&rdquo;
              </p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                <div className="flex flex-wrap gap-1">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <CopyButton
                  copied={copied === id}
                  onClick={() => copy(id, p.text)}
                  label="Copy prompt"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <a
          href={DOCS_PROMPTS_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
        >
          More prompts <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          A platform fee plus the contracts you send
        </h2>
        <p className="text-lg text-slate-300">
          No seats and no per-agent fees. Start in the free sandbox.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING.map((p) => (
          <div
            key={p.name}
            className={
              "flex flex-col rounded-2xl border p-6 " +
              (p.highlight
                ? "border-white/30 bg-neutral-900/90 backdrop-blur-md"
                : "border-white/10 bg-neutral-950/80 backdrop-blur-md")
            }
          >
            <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
              {p.name}
            </h3>
            <div className="mt-3 min-h-[2.5rem] text-white">
              {p.price ? (
                <>
                  <span className="text-3xl font-semibold tracking-tight">
                    {p.price}
                  </span>
                  {p.unit && p.price !== "Free" && (
                    <span className="ml-1 text-zinc-400">{p.unit}</span>
                  )}
                </>
              ) : (
                <span className="text-xl font-semibold tracking-tight">
                  {p.fallback}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-400">{p.blurb}</p>
            <ul className="mb-6 mt-5 space-y-2">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {it}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={p.highlight ? "default" : "outline"}
              className="mt-auto rounded-full"
            >
              <a href={p.cta.href} target="_blank" rel="noopener">
                {p.cta.label}
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
