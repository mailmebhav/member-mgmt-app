"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mytheme = createTheme({
  palette: {
    primary: {
      main: "#5D6D7E",
    },
    secondary: {
      main: "#F39C12",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
export default mytheme;
