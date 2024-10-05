import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import MyMoralisProvider from "./components/MyMoralisProvider";
import ClientNotificationProvider from "./components/ClientNotificationProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Smart Contract Lottery",
  description: "This is a smart contract lottery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyMoralisProvider>
    <html lang="en">
      <body>
        <ClientNotificationProvider>
          {children}
        </ClientNotificationProvider>
      </body>
    </html>
    </MyMoralisProvider>
    
  );
}
