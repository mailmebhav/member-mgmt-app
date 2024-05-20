import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import mytheme from "../components/mytheme";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "Member Manager",
  description: "App for managing samaj",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={mytheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
