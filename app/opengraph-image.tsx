import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Fundación Ciudad Verde — experiencia ambiental, social y técnica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(
      process.cwd(),
      "public",
      "assets",
      "logos",
      "fcv-logo-horizontal-green.svg",
    ),
    "base64",
  );
  const logoSource = `data:image/svg+xml;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "#38343A",
          background: "#F3FFBD",
          fontFamily: "sans-serif",
        }}
      >
        {/* ImageResponse procesa el SVG oficial como recurso embebido. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSource}
          alt=""
          width={500}
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08 }}>
            Experiencia ambiental, social y técnica
          </div>
          <div style={{ fontSize: 31, color: "#5F6449" }}>
            Transformamos territorios
          </div>
        </div>
      </div>
    ),
    size,
  );
}
