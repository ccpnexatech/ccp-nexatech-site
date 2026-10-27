import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Caio César Ponte";
  const description =
    searchParams.get("description") ??
    "Desenvolvedor Front-End & Mobile · React, React Native e TypeScript · Fortaleza, CE";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#05080F",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(61,110,245,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "rgba(61,110,245,0.2)",
              border: "1px solid rgba(61,110,245,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 800,
              color: "#8AAED9",
            }}
          >
            CP
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#E2E8F0" }}>
            caio-cesar-ponte
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: title.length > 40 ? "44px" : "56px",
              fontWeight: 800,
              color: "#F1F5F9",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            {description}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#F97316",
            }}
          />
          <span style={{ fontSize: "14px", color: "#475569" }}>
            Fortaleza, Ceará — Nordeste do Brasil
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
