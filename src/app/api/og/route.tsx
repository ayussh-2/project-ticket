import { ImageResponse } from "next/og";
/** @jsxImportSource react */

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return new Response("Missing name parameter", { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#f6f6f6",
              backgroundImage:
                "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
              backgroundSize: "100px 100px",
              opacity: 0.1,
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#E84B7D",
                fontSize: 60,
                fontWeight: 700,
              }}
            >
              hackNITR
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 48,
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              <span style={{ color: "#E84B7D" }}>{name}</span>
              <span style={{ marginLeft: "8px" }}>is attending hackNITR</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
