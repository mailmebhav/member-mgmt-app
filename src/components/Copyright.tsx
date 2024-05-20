import Typography from '@mui/material/Typography';

const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" pt={1}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright;