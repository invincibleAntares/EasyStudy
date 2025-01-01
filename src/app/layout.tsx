import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const  outfit = Outfit({subsets: ["latin"]});
export const metadata: Metadata = {
  title: "Easy Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
        {children}
        </Provider>
       <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
