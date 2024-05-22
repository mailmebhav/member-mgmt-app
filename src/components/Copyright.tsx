import { Typography, Box } from '@mui/material'

const Copyright = () => {
  return (
    <Box sx={{bottom: 0}}>
      <Typography variant="body2" color="text.secondary" align="center" pt={1}>
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
