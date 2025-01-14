import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased`}
      >
        <div className="flex px-2">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="w-full">
            <div className="sticky top-0 z-20">
              <Header />
            </div>
            <ReduxProvider>
              <Toaster position="top-center" richColors expand={true} />
              {children}
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
