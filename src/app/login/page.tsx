'use client'
import { Avatar, Typography, Box, Button, Container, CssBaseline, TextField, useTheme } from '@mui/material'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright'
const Page = () => {
  const mytheme = useTheme()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <Container component={'main'} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '0.5px solid lightgray',
            borderRadius: 7,
            padding: 8,
            boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',  
          }}
        >
          {/* <Box
          component="img"
          sx={{
            height: 150,
            width: 150, 
          }}
          alt="samaj logo"
          src="logo-samaj.jpg"
          /> */}
           <Avatar sx={{ m: 1, bgcolor: `${mytheme.palette.primary.dark}` }}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                background: `${mytheme.palette.primary.dark}`,
              "&:hover": {
                background: `${mytheme.palette.primary.main}`
              }
            }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      <Copyright />
    </Container>
  )
}

export default Page