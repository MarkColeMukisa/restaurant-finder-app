
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 320, // Scaled up
                    background: "#FF6B35",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    fill="none"
                    style={{ width: '80%', height: '80%' }}
                >
                    <g transform="translate(0, 0)">
                        <path
                            d="M42 28 v28 c0 6 4 10 10 10 s10 -4 10 -10 v-28"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <line x1="42" y1="38" x2="62" y2="38" stroke="white" strokeWidth="7" strokeLinecap="round" />
                        <line x1="52" y1="66" x2="52" y2="100" stroke="white" strokeWidth="7" strokeLinecap="round" />
                        <path
                            d="M78 28 h14 c0 0 0 35 0 35 c0 5 -4 10 -7 10 c-3 0 -7 -5 -7 -10 v-35 Z"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path d="M85 70 v30" stroke="white" strokeWidth="7" strokeLinecap="round" />
                    </g>
                </svg>
            </div>
        ),
        { width: 512, height: 512 }
    );
}
