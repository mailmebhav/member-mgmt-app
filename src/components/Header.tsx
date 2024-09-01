"use client";
import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  useTheme,
  IconButton
} from "@mui/material";
import { useRouter } from "next/navigation"
import HomeIcon from "@mui/icons-material/Home"
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
const Header = () => {
  const mytheme = useTheme()
  const router = useRouter()
  return (
    <>
      <Box sx={{ flexGrow: 1, height: 'auto', position: "static", overflow: 'hidden', }}>
        <AppBar position="static" sx={{ background: "smokewhite" }}>
          <Toolbar>
            <Box
              sx={{
                width: 40,
                height: 40,
                border: "2px solid gray",
                borderRadius: 1,
              }}
              component="img"
              alt="samaj-logo"
              src="logo-samaj.png"
            />
            <Typography
              variant="body2"
              component="span"
              paddingLeft={2}
              paddingTop={0.5}
              sx={{
                fontWeight: 500,
                fontSize: 16, 
                flexGrow: 1,
                cursor: 'pointer'
              }}
              color={'orange'}
              onClick={() => {
                router.push('/')
              }}
            >
              Member Manager
            </Typography>
            <IconButton sx={{float: 'right', color: 'orange'}} onClick={()=>router.push('/stats')}>
              <GroupOutlinedIcon />
            </IconButton>
            <IconButton sx={{float: 'right', color: 'orange'}} onClick={()=>router.push('/')}>
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
