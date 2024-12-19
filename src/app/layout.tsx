import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/state/store-provider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karvi Challenge 2024",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </head>
      <StoreProvider>
        <body className={`${raleway.variable}`} suppressHydrationWarning>
          <main className="py-8">
            <div className="md:flex w-[min(90%,76.25rem)] flex-wrap mx-auto md:gap-8">
              {" "}
              {children}
            </div>
          </main>
        </body>
      </StoreProvider>
    </html>
  );
}
