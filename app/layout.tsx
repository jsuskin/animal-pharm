import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientInit from "./components/ClientInit";
import Header from "./components/Header";
import { getUser } from "@/utils/supabase/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnimalPharm",
  description: "Animal Pharmacy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, error } = await getUser();

  if (error) console.error(error);

  return (
    <html lang='en' className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name='apple-mobile-web-app-title' content='AnimalPharm' />
      </head>
      <body className='min-h-full flex flex-col'>
        <Header user={user} />
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
