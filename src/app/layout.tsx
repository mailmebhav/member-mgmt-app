import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import mytheme from '../components/mytheme'
import CssBaseline from '@mui/material/CssBaseline';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Member Manager",
  description: "App for managing samaj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={mytheme}>
        <CssBaseline />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}