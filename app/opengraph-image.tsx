import { ImageResponse } from "next/og";

export const alt = "Sendforsign — eSignature API and embedded contract workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 75% 20%, #2a2a35 0%, #0b0b0f 55%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#ffffff",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 600 }}>Sendforsign</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05 }}>
            eSignature for your Business and AI Agent
          </div>
          <div style={{ fontSize: 32, color: "#a1a1aa" }}>
            API-first contracts, embedded signing, AI assistant, webhooks
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#71717a" }}>sendforsign.com</div>
      </div>
    ),
    size,
  );
}
