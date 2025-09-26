import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast"
import Navbar from "@/components/Navbar";
import { ErrorProvider } from "@/components/contextProviders/ErrorProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moneturn",
  description: "A simple app to manage books and authors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ErrorProvider>
      </body>
    </html>
  );
}
