import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import mytheme from "../components/mytheme";
import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";

export const metadata: Metadata = {
  title: "Member Manager",
  description: "App for managing samaj members/firms/payments data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <StrictMode />
        <ThemeProvider theme={mytheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
