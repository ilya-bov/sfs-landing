import fs from "node:fs";
import path from "node:path";

// Blog posts are Markdown files in content/blog/<slug>.md with a small front matter
// (title, description, date, author). They are read at build time; every post page
// is statically generated. The Markdown subset is deliberately small (headings,
// paragraphs, lists, tables, fenced code, bold, italic, links, inline code), so no
// parser dependency.

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string; // "Name, role" for a person, or "Sendforsign" for the company
  draft: boolean; // true: shown by `pnpm dev`, left out of production builds
  html: string;
};

const DIR = path.join(process.cwd(), "content", "blog");

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text: string): string {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g, (_m, label, href) => {
    const external = /^https?:\/\//.test(href) && !href.startsWith("https://sendforsign.com");
    return `<a href="${href}"${external ? ' rel="noopener" target="_blank"' : ""}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return s;
}

// Line-based: fenced code blocks, ## headings, - and 1. lists, | tables |, and
// paragraphs separated by blank lines. Inline: links, **bold**, *italic*, `code`.
export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").trim().split("\n");
  const out: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = /^```(\w*)\s*$/.exec(line);
    if (fence) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i]);
      const lang = fence[1] ? ` data-language="${fence[1]}"` : "";
      out.push(`<pre><code${lang}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }
    if (!line.trim()) { flush(); continue; }
    const h = /^(#{2,4})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      continue;
    }
    if (/^\|.*\|\s*$/.test(line)) {
      flush();
      const rows: string[] = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) rows.push(lines[i++]);
      i--;
      const cells = (r: string) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const body = rows.filter((r) => !/^\|[\s:|-]+\|$/.test(r.trim()));
      const [head, ...rest] = body;
      out.push(
        `<div class="table-wrap"><table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>` +
          `<tbody>${rest.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
      );
      continue;
    }
    const ul = /^[-*]\s+(.*)$/.exec(line);
    const ol = /^\d+\.\s+(.*)$/.exec(line);
    if (ul || ol) {
      flush();
      const tag = ul ? "ul" : "ol";
      const re = ul ? /^[-*]\s+(.*)$/ : /^\d+\.\s+(.*)$/;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(re.exec(lines[i++])![1]);
      i--;
      out.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</${tag}>`);
      continue;
    }
    para.push(line.trim());
  }
  flush();
  return out.join("\n");
}

function parse(slug: string, raw: string): Post {
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`Front matter missing in content/blog/${slug}.md`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
  }
  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) throw new Error(`content/blog/${slug}.md has no ${key}`);
  }
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    author: meta.author || "Sendforsign",
    draft: meta.draft === "true",
    html: markdownToHtml(m[2]),
  };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    // Drafts (draft: true) are visible in `pnpm dev` only, never in a production build.
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const isPerson = (author: string) => author !== "Sendforsign";

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
