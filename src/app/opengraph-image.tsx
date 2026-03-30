import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kensho Ventures | European Deep-Tech Venture Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#FEB180",
            marginBottom: 48,
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          KENSHŌ
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.3,
            maxWidth: 700,
            marginBottom: 48,
          }}
        >
          European Deep-Tech Venture Capital
        </div>

        {/* Verticals */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["Robotics", "Cybersecurity", "Quantum", "Industrial AI"].map(
            (vertical) => (
              <div
                key={vertical}
                style={{
                  fontSize: 18,
                  color: "#FEB180",
                  border: "1px solid rgba(254, 177, 128, 0.3)",
                  padding: "8px 20px",
                  borderRadius: 100,
                }}
              >
                {vertical}
              </div>
            )
          )}
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.3)",
            letterSpacing: "0.05em",
          }}
        >
          kensho.vc
        </div>
      </div>
    ),
    { ...size }
  );
}
