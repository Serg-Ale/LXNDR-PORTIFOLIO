import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "LXNDR"
  const type = searchParams.get("type") || "default"

  const fontBebas = await fetch(
    new URL("https://fonts.gstatic.com/s/bebasneue/v9/T25SVdWHdKB-S4Ac4Q1MVEu7nHk.woff2")
  ).then((res) => res.arrayBuffer())

  const fontGeist = await fetch(
    new URL("https://fonts.gstatic.com/s/geist/v26/NGMivGRbY7v3mJ7TBXnaGp7Tus.woff2")
  ).then((res) => res.arrayBuffer())

  if (type === "blog") {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1200px",
            height: "630px",
            backgroundColor: "#0a0a0a",
            padding: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "8px solid white",
              margin: "20px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Bebas Neue",
                    fontSize: "48px",
                    color: "#0a0a0a",
                    fontWeight: "bold",
                  }}
                >
                  LX
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Geist",
                  fontSize: "28px",
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                }}
              >
                Blog Post
              </span>
            </div>

            <h1
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "96px",
                color: "white",
                lineHeight: "0.9",
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {title.length > 50 ? title.slice(0, 50) + "..." : title}
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Geist",
                  fontSize: "24px",
                  color: "white",
                  opacity: 0.8,
                }}
              >
                lxndr.dev/blog
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Geist",
                    fontSize: "20px",
                    color: "white",
                    padding: "8px 20px",
                    border: "2px solid white",
                  }}
                >
                  Next.js
                </span>
                <span
                  style={{
                    fontFamily: "Geist",
                    fontSize: "20px",
                    color: "white",
                    padding: "8px 20px",
                    border: "2px solid white",
                  }}
                >
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Bebas Neue",
            data: fontBebas,
            style: "normal",
          },
          {
            name: "Geist",
            data: fontGeist,
            style: "normal",
          },
        ],
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "8px solid white",
            margin: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Bebas Neue",
                  fontSize: "56px",
                  color: "#0a0a0a",
                  fontWeight: "bold",
                }}
              >
                LX
              </span>
            </div>
            <span
              style={{
                fontFamily: "Geist",
                fontSize: "32px",
                color: "white",
                letterSpacing: "6px",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h1
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "120px",
                color: "white",
                lineHeight: "0.9",
                margin: 0,
              }}
            >
              SÉRGIO
            </h1>
            <h1
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "120px",
                color: "transparent",
                WebkitTextStroke: "4px white",
                lineHeight: "0.9",
                margin: 0,
              }}
            >
              ALEXANDRE
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Geist",
                fontSize: "28px",
                color: "white",
              }}
            >
              Full-Stack Software Engineer
            </span>
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "Geist",
                  fontSize: "18px",
                  color: "#0a0a0a",
                  backgroundColor: "white",
                  padding: "12px 24px",
                  fontWeight: "bold",
                }}
              >
                Next.js
              </span>
              <span
                style={{
                  fontFamily: "Geist",
                  fontSize: "18px",
                  color: "#0a0a0a",
                  backgroundColor: "white",
                  padding: "12px 24px",
                  fontWeight: "bold",
                }}
              >
                React
              </span>
              <span
                style={{
                  fontFamily: "Geist",
                  fontSize: "18px",
                  color: "#0a0a0a",
                  backgroundColor: "white",
                  padding: "12px 24px",
                  fontWeight: "bold",
                }}
              >
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Bebas Neue",
          data: fontBebas,
          style: "normal",
        },
        {
          name: "Geist",
          data: fontGeist,
          style: "normal",
        },
      ],
    }
  )
}
