import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['100', '300', '500', '700'],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "JJV Manager",
  description: "A manager platform for client/process management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}