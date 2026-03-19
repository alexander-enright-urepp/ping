import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ping - Stay in Touch",
  description: "Your personal CRM to track and maintain connections effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
