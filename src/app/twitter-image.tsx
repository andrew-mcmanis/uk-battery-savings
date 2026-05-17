import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const alt = "UK Home Battery Savings Calculator";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#020617",
          color: "white",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#020617",
                fontSize: "36px",
                fontWeight: 900,
              }}
            >
              ⚡
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#a7f3d0",
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                fontSize: "72px",
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-3px",
              }}
            >
              UK Home Battery Savings Calculator
            </div>

            <div
              style={{
                marginTop: "28px",
                fontSize: "32px",
                lineHeight: 1.35,
                color: "#cbd5e1",
              }}
            >
              Share a battery savings estimate with clear UK tariff assumptions.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              fontSize: "24px",
              color: "#e2e8f0",
            }}
          >
            <div
              style={{
                padding: "14px 22px",
                borderRadius: "999px",
                background: "rgba(16, 185, 129, 0.18)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
              }}
            >
              Savings
            </div>

            <div
              style={{
                padding: "14px 22px",
                borderRadius: "999px",
                background: "rgba(16, 185, 129, 0.18)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
              }}
            >
              Payback
            </div>

            <div
              style={{
                padding: "14px 22px",
                borderRadius: "999px",
                background: "rgba(16, 185, 129, 0.18)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
              }}
            >
              Quote checks
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
