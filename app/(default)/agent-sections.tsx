"use client";
import { useState } from "react";
import {
  Bot,
  Check,
  Copy,
  FileText,
  Layers,
  PenLine,
  ShieldCheck,
  Users,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Single place for outbound links used by the agent-positioning sections.
// DOCS_AGENTS_URL points at the "AI agents" docs section that is being written
// in sendforsign-docs; adjust the slug once that section is published.
export const APP_URL = "https://app.sendforsign.com";
export const DOCS_AGENTS_URL = "https://about.sendforsign.com/ai-agents/overview";
export const DOCS_API_URL = "https://about.sendforsign.com/api-reference/introapi";
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

const MCP_CONFIG = `{
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
}`;

const REST_SNIPPET = `curl -X POST 'https://api.sendforsign.com/api/contract' \\
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "data": {
      "action": "create",
      "clientKey": "YOUR_CLIENT_KEY",
      "userKey": "YOUR_CUSTOMERS_USER_KEY",
      "contract": {
        "name": "Photography services agreement",
        "templateKey": "TEMPLATE_KEY"
      }
    }
  }'`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
      {children}
    </p>
  );
}

function CodeCard({
  title,
  label,
  code,
}: {
  title: string;
  label: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable (insecure context); the text stays selectable
    }
  };
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-neutral-950/85 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60">{label}</span>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${title}`}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 transition hover:bg-white/10"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-300" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="mt-3 grow overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-[12px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const FLOW = [
  {
    icon: FileText,
    title: "Template",
    text: "Your customer's own contract template, with fields marked by who fills them.",
  },
  {
    icon: Bot,
    title: "Agent fills its fields",
    text: "The agent creates the contract and fills the fields assigned to it: names, fees, dates.",
  },
  {
    icon: Users,
    title: "Counterparty fills theirs",
    text: "Each recipient completes only the fields assigned to them, inside the signing page.",
  },
  {
    icon: PenLine,
    title: "Sign",
    text: "Signing links go out by email or show up inside your product, under your brand.",
  },
  {
    icon: Webhook,
    title: "Webhook",
    text: "Your backend and your agent get an event when the contract is viewed and signed.",
  },
];

export function AgentFlowSection() {
  return (
    <section
      id="agents"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow>
          <Bot className="h-4 w-4 text-emerald-400" />
          How it works for an agent
        </Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          From template to signed, without a human in the loop
        </h2>
        <p className="text-lg text-slate-300">
          The agent does its part of the paperwork, the counterparty does
          theirs, and your product hears about it when it is done.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {FLOW.map((step, i) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-white/10 bg-neutral-950/80 p-5 backdrop-blur-md"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                {i + 1}
              </span>
              <step.icon className="h-4 w-4 text-white/70" />
            </div>
            <h3 className="mb-1 font-semibold text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeCard
          title="Connect any MCP client"
          label="mcp.json"
          code={MCP_CONFIG}
        />
        <CodeCard
          title="Or call the REST API"
          label="curl"
          code={REST_SNIPPET}
        />
      </div>
      <p className="mt-4 text-center text-sm text-zinc-500">
        The MCP server is in early access and calls the same REST API, with
        the same keys and permissions.
      </p>
    </section>
  );
}

const CLIENTS = ["Claude", "ChatGPT", "Cursor", "Claude Code", "Any MCP client"];

export function WorksWithSection() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 pb-8 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-black/50 p-6 text-center md:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Works with
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-zinc-500">
          Plus your own agent over REST, and React components for the human
          side of the flow.
        </p>
      </div>
    </section>
  );
}

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Field roles per recipient",
    text: "Every template field says who fills it: the agent, any recipient, or one specific recipient. The agent never invents the counterparty's details, and the counterparty cannot touch the agent's.",
    bullets: [
      "Agent / owner, any recipient, or a named recipient",
      "Signers, approvers and viewers on one contract",
      "Signing links you can show in your own UI",
    ],
  },
  {
    icon: Layers,
    title: "Embedded, white-label, multi-tenant",
    text: "A vertical SaaS gives each of its customers their own contracts, templates and branding, all running on Sendforsign behind the scenes. Their users sign inside the product they already use and never see us.",
    bullets: [
      "One tenant (userKey) per customer of yours",
      "Your brand on emails and signing pages",
      "Drop-in React components or your own UI",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Agent accountability",
    text: "Know which agent did what, on whose behalf. Agents run in a mode you choose, sending needs an explicit confirmation, and every action is written to an audit log.",
    bullets: [
      "Modes: read only, drafts, send",
      "Explicit confirmation before anything is sent",
      "Allowed recipient domains and an action log",
    ],
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Eyebrow>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Why Sendforsign
        </Eyebrow>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          More than e-signature with an MCP server
        </h2>
        <p className="text-lg text-slate-300">
          Built for products where an agent prepares the contract and real
          people sign it.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {DIFFERENTIATORS.map((d) => (
          <div
            key={d.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-neutral-950/80 p-6 backdrop-blur-md"
          >
            <d.icon className="mb-4 h-6 w-6 text-white/80" />
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
              {d.title}
            </h3>
            <p className="mb-5 leading-relaxed text-zinc-400">{d.text}</p>
            <ul className="mt-auto space-y-2">
              {d.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-zinc-500">
        Simple electronic signatures for the EU and the US, with an audit trail
        on every contract.
      </p>
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
