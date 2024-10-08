import * as React from "react";
import FirmContent from "@/components/FirmContent";
import Header from "@/components/Header";
import { Box } from "@mui/material";
export default function Page() {
  return (
    <Box sx={{    height: '100%',
      overflow: "hidden"}}>
      <Header />
      <FirmContent />
    </Box>
  );
}
