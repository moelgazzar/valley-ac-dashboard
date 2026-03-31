import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valley AC | Sales Dashboard",
  description: "Sales performance dashboard for Valley Air Conditioning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
