import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AX 스타터 킷",
  description: "AX 팀의 개발 온보딩 허브. 기술 스택, 아키텍처, 개발 환경, 배포 파이프라인 가이드.",
  keywords: ["AX", "온보딩", "Next.js", "FastAPI", "Palantir Ontology", "Coolify", "Monorepo"],
  authors: [{ name: "AX Team" }],
  openGraph: {
    title: "AX 스타터 킷",
    description: "AX 팀의 개발 온보딩 허브. 기술 스택, 아키텍처, 개발 환경, 배포 파이프라인 가이드.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Pretendard Font - Dongwha Design System */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
