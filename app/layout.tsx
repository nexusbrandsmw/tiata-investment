import type { Metadata } from "next";
import { Roboto_Slab, Poppins } from "next/font/google";
import "./globals.css";

const fraunces = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const workSans = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tiatamw.com"),
  title: {
    default: "Tiata Investment | Real fruit, pressed close to where it grows",
    template: "%s | Tiata Investment",
  },
  description:
    "Tiata Investment turns mango, baobab, passion fruit, and guava from Malawian smallholder farms into juice on shelf within days of harvest.",
  openGraph: {
    siteName: "Tiata Investment",
    type: "website",
    locale: "en_MW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${workSans.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
