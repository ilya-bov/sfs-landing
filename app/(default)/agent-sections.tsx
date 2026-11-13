"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  Copy,
  FileCode,
  FileText,
  Globe,
  Hexagon,
  Layers,
  MessageSquare,
  Monitor,
  MousePointerClick,
  PenLine,
  ShieldCheck,
  Terminal,
  Users,
  Webhook,
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
// Integration snippets. Kept in sync with sendforsign-docs ai-agents/mcp-quickstart.
// ---------------------------------------------------------------------------

type Integration = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  file: string;
  code: string;
};

const INTEGRATIONS: Integration[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    icon: Terminal,
    file: "terminal",
    code: `claude mcp add --transport http sendforsign https://api.sendforsign.com/mcp \\
  --header "X-Sendforsign-Key: YOUR_API_KEY" \\
  --header "X-Sendforsign-Client-Key: YOUR_CLIENT_KEY"`,
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    icon: Monitor,
    file: "claude_desktop_config.json",
    code: `{
  "mcpServers": {
    "sendforsign": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote", "https://api.sendforsign.com/mcp",
        "--header", "X-Sendforsign-Key:\${SFS_KEY}",
        "--header", "X-Sendforsign-Client-Key:\${SFS_CLIENT}",
        "--header", "X-Sendforsign-Agent-Mode:draft"
      ],
      "env": {
        "SFS_KEY": "YOUR_API_KEY",
        "SFS_CLIENT": "YOUR_CLIENT_KEY"
      }
    }
  }
}`,
  },
  {
    id: "cursor",
    label: "Cursor",
    icon: MousePointerClick,
    file: ".cursor/mcp.json",
    code: `{
  "mcpServers": {
    "sendforsign": {
      "url": "https://api.sendforsign.com/mcp",
      "headers": {
        "X-Sendforsign-Key": "\${env:SENDFORSIGN_API_KEY}",
        "X-Sendforsign-Client-Key": "\${env:SENDFORSIGN_CLIENT_KEY}",
        "X-Sendforsign-Agent-Mode": "draft"
      }
    }
  }
}`,
  },
  {
    id: "openai",
    label: "OpenAI Agents SDK",
    icon: Bot,
    file: "agent.py",
    code: `from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

async with MCPServerStreamableHttp(
    name="sendforsign",
    params={
        "url": "https://api.sendforsign.com/mcp",
        "headers": {
            "X-Sendforsign-Key": os.environ["SENDFORSIGN_API_KEY"],
            "X-Sendforsign-Client-Key": os.environ["SENDFORSIGN_CLIENT_KEY"],
            "X-Sendforsign-Agent-Mode": "draft",
        },
    },
) as sfs:
    agent = Agent(name="Contracts", mcp_servers=[sfs])
    result = await Runner.run(agent, "Draft an NDA for Acme Ltd.")`,
  },
  {
    id: "mcp-json",
    label: "Any MCP client",
    icon: Braces,
    file: "mcp.json",
    code: `{
  "mcpServers": {
    "sendforsign": {
      "type": "http",
      "url": "https://api.sendforsign.com/mcp",
      "headers": {
        "X-Sendforsign-Key": "YOUR_API_KEY",
        "X-Sendforsign-Client-Key": "YOUR_CLIENT_KEY"
      }
    }
  }
}`,
  },
  {
    id: "curl",
    label: "REST / cURL",
    icon: Globe,
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
  {
    id: "node",
    label: "Node.js",
    icon: Hexagon,
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
  {
    id: "python",
    label: "Python",
    icon: FileCode,
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

const FLOW = [
  { icon: FileText, title: "Template", text: "Fields marked by who fills them." },
  { icon: Bot, title: "Agent fills its fields", text: "Names, fees, dates." },
  { icon: Users, title: "Counterparty fills theirs", text: "Inside the signing page." },
  { icon: PenLine, title: "Sign", text: "By email or inside your product." },
  { icon: Webhook, title: "Webhook", text: "Viewed, signed, done." },
];

export function IntegrationSection() {
  const [active, setActive] = useState(INTEGRATIONS[0].id);
  const { copied, copy } = useCopy();
  const current = INTEGRATIONS.find((i) => i.id === active) ?? INTEGRATIONS[0];
  const lines = current.code.split("\n");

  return (
    <section
      id="agents"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Eyebrow>
          <Bot className="h-4 w-4 text-emerald-400" />
          MCP server and REST API
        </Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Connect your agent in a minute
        </h2>
        <p className="text-lg text-slate-300">
          Pick your client, paste one snippet, and your agent can draft, fill
          and send contracts.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Choose your client"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {INTEGRATIONS.map((it) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(it.id)}
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

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <span className="truncate rounded-md bg-white/10 px-2 py-0.5 font-mono text-[12px] text-white/80">
              {current.file}
            </span>
          </div>
          <CopyButton
            copied={copied === current.id}
            onClick={() => copy(current.id, current.code)}
            label={`Copy ${current.label} snippet`}
          />
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
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-4 py-3 text-sm">
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
          <span className="text-white/40 sm:ml-auto">
            MCP server in early access
          </span>
        </div>
      </div>

      <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {FLOW.map((step, i) => (
          <li
            key={step.title}
            className="rounded-2xl border border-white/10 bg-neutral-950/80 p-4 backdrop-blur-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
                {i + 1}
              </span>
              <step.icon className="h-4 w-4 text-white/70" />
            </div>
            <h3 className="text-sm font-semibold text-white">{step.title}</h3>
            <p className="mt-1 text-xs text-zinc-400">{step.text}</p>
          </li>
        ))}
      </ol>
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
  { agent: "intake-agent", action: "create_contract", ok: true },
  { agent: "intake-agent", action: "send_for_signature", ok: true },
  { agent: "intake-agent", action: "send → gmail.com", ok: false },
];

function AuditVisual() {
  return (
    <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-black/40 font-mono text-[11px]">
      {AUDIT_ROWS.map((r) => (
        <div key={r.action} className="flex items-center gap-2 px-3 py-2">
          <span className="text-white/50">{r.agent}</span>
          <span className="text-white/30">·</span>
          <span className="truncate text-white/80">{r.action}</span>
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
        Simple electronic signatures for the EU and the US. Audit log in early
        access.
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
