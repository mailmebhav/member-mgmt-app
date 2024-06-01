"use client";
import {
  Avatar,
  Typography,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  useTheme,
  Alert,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright";
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const Page = () => {
  const router = useRouter()
  const mytheme = useTheme();
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [verified, setVerified] = React.useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setButtonLoading(true)
      setVerified(false)
    const request = {
      userName: values.username,
      password: values.password
    }
    const requestPayloadWithHeader = {
      method: 'POST',
      url: 'http://localhost:3000/api/adminauth/validate',
      data: request,
      headers: {
        "Content-Type": "application/json" 
       },
    }
   
    axios
		.request(requestPayloadWithHeader)
		.then((response : AxiosResponse) =>  {
      console.log(response)
      if(response.status === 200)
      {
        router.push('/')
      }
      setVerified(true)
      setButtonLoading(false)

		})
		.catch(function (error: any) {
      setVerified(true)
      setButtonLoading(false)
		});    
  },
  });

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "0.5px solid lightgray",
          borderRadius: 7,
          padding: 8,
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
      >
        
        <Avatar sx={{ m: 1, bgcolor: `${mytheme.palette.primary.dark}` }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{mt: 1}}>
        
        </Box>
        <Box sx={{mt: 1}}>
        <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          size="small"
          id="username"
          name="username"
          label="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          sx={{
            mt: 2
          }}
          fullWidth
          size="small"
          id="password"
          name="password" 
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
          <LoadingButton
        loading={buttonLoading}
        loadingPosition="start"
        variant="outlined"
        type="submit"
            fullWidth
            sx={{
              mt: 2,
              color: 'white',
              background: `${mytheme.palette.primary.dark}`,
              "&:hover": {
                color:'white',
                background: `${mytheme.palette.primary.main}`,
              },
            }}
      >
        Sign in
      </LoadingButton>
      </form>
        </Box>
        {verified ? <Alert severity="error">{"Credentials invalid"}</Alert> : ""}

      </Box>
      <Copyright />
    </Container>
  );
};

export default Page;
