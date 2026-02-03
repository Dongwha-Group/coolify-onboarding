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
  title: "Coolify 자동배포 스타터 킷",
  description: "Git Push 한 번으로 프로덕션까지. 셀프호스팅 PaaS Coolify를 사용한 자동배포 가이드.",
  keywords: ["Coolify", "자동배포", "Docker", "CI/CD", "셀프호스팅", "PaaS"],
  authors: [{ name: "Coolify Community" }],
  openGraph: {
    title: "Coolify 자동배포 스타터 킷",
    description: "Git Push 한 번으로 프로덕션까지. 셀프호스팅 PaaS Coolify를 사용한 자동배포 가이드.",
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
