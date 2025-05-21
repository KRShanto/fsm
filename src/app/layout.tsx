import type { Metadata } from "next";
import { Alumni_Sans, Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Footer from "@/components/Footer";
import { ComparisonProvider } from "@/context/ComparisonContext";
import FloatingComparisonBar from "@/components/FloatingComparisonBar";

const inter = Inter({
  subsets: ["latin"],
});

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-alumni",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Be Safe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alumniSans.variable} ${montserrat.variable}`}>
      <body style={inter.style}>
        <ComparisonProvider>
          <Navbar />
          <HeroVideo />
          {children}
          <Footer />
          <FloatingComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  );
}
