import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import AssistantWidget from "@/components/AssistantWidget";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaxFlow",
  description:
    "Managed financial services and a secure client portal for organised tax workflows and reporting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans" style={{ background: "#4F5B35", color: "#F8F6F1" }}>
        <SiteHeader />
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
