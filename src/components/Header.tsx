"use client";
import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation"

const Header = () => {
  const mytheme = useTheme()
  const router = useRouter()
  return (
    <>
      <Box sx={{ flexGrow: 1, height: '10vh', position: "static" }}>
        <AppBar position="static" sx={{ background: "smokewhite" }}>
          <Toolbar>
            <Box
              sx={{
                width: 40,
                height: 40,
                border: "2px solid lightgray",
                borderRadius: 1,
              }}
              component="img"
              alt="samaj-logo"
              src="logo-samaj.png"
            />
            <Typography
              variant="body1"
              component="div"
              paddingLeft={2}
              paddingTop={0.5}
              sx={{
                fontWeight: 12, 
                flexGrow: 1,
                cursor: 'pointer'
              }}
              color={'white'}
              onClick={() => {
                router.push('/')
              }}
            >
              Member Manager
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
