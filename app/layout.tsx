import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTBMUSICHUB",
  description:
    "A universal music education platform for musicians, singers, bands, and sound engineers — from beginner to advanced.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
