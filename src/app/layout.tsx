import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { SidebarProvider } from "@/lib/components/ui/sidebar";
import AppSidebar from "@/modules/app-sidebar";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import AppSchemaProvider from "@/shared/providers/AppSchemaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Metadata } from "next";
import { Schema } from "@/shared/types/shema";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(
    `${process.env.__NEXT_PRIVATE_ORIGIN}/config/schema.json`
  );
  const data: Schema = await response.json();

  return data.meta;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSchemaProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">{children}</main>
            </SidebarProvider>
          </AppSchemaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
