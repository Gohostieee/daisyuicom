import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  currentUser,
  ClerkProvider,
} from '@clerk/nextjs'
import { } from '@clerk/nextjs/server'
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          data-theme="cupcake"
        >
          <Navbar />
          {children}
        </body>
      </ClerkProvider>

    </html >
  );
}
