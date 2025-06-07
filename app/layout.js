import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./(home)/_components/navbar";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PlanetX",
  description: "Build by PlanetX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7976720973471795"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="w-full">
          <Navbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}