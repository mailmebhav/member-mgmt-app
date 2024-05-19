import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainContent from '@/components/MainContent';
import Header from '@/components/Header';
import Copyright from '@/components/Copyright';
export default function Page() {
  return (
    <>
    <Header />  
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <MainContent />
      </Box>
    </Container>
    <Copyright />
    </>
  );
}