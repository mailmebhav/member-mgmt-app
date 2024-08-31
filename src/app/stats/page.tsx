import * as React from "react";
import StatsContent from "@/components/StatsContent";
import Header from "@/components/Header";
import { Box } from "@mui/material";
export default function Page() {
  return (
    <Box sx={{scrollbarWidth: 'none'}}>
      <Header />
      <StatsContent />
    </Box>
  );
}
