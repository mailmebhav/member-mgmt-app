"use client"
import React from 'react'
import { AppBar, Box, Stack, Typography, Toolbar, useTheme }  from '@mui/material';

const Header = () => {
  const mytheme= useTheme()
  return (
    <>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: 'smokewhite'}}>
        <Toolbar>
        <Box 
      sx={{
        width: 40,
        height: 40,
        border: '2px solid lightgray',
        borderRadius: 1
      }}
      component="img"
      alt="samaj-logo"
      src="logo-samaj.png"
      />
      <Typography variant="h6" component="div" pl={2} pt={0.5} sx={{ flexGrow: 1 }} color={mytheme.palette.primary.main}>
        Member manager
      </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
    
  )
}

export default Header