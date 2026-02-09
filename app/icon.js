import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: "#FF6B35",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "100%",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    fill="none"
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Utensils Group - Centered and Maximized */}
                    <g transform="translate(0, 0)">
                        {/* Fork (Left) */}
                        <path
                            d="M42 28 v28 c0 6 4 10 10 10 s10 -4 10 -10 v-28"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <line
                            x1="42" y1="38" x2="62" y2="38"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinecap="round"
                        />
                        <line
                            x1="52" y1="66" x2="52" y2="100"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinecap="round"
                        />

                        {/* Knife (Right) */}
                        <path
                            d="M78 28 h14 c0 0 0 35 0 35 c0 5 -4 10 -7 10 c-3 0 -7 -5 -7 -10 v-35 Z"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path
                            d="M85 70 v30"
                            stroke="white"
                            strokeWidth="7"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
