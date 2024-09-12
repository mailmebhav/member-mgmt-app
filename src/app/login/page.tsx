"use client";
import {
  Avatar,
  Typography,
  Box,
  Container,
  CssBaseline,
  TextField,
  useTheme,
  Alert,
  Divider,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright";
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton'
import useLocalStorage from "@/hooks/useLocalStorage"
import { LoginValidationSchema } from '../../components/validation/ValidationScheme'
const Page = () => {
  const router = useRouter()
  const mytheme = useTheme();
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [verified, setVerified] = React.useState<boolean>(false);
  const [, setValue] = useLocalStorage("token")
  const saveToLocalStorage = (token:string) => {
    setValue(token)
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
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
      if(response.status === 200)
      {
        saveToLocalStorage(response?.data?.data?.token)
        router.push('/')
      }
      else
      {
        setVerified(true)
        setButtonLoading(false)
      }
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
          borderRadius: 2,
          padding: 8,
          background: '#FADFA1',
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
      >
         <Typography component="h3" variant="h5" sx={{fontWeight: 500, mb: 3}} color="#C96868">
          Member manager
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "#C96868" }}>
          <LockOutlinedIcon />
        </Avatar> 
       
        <Typography component="h3" variant="h6" color="#C96868">
         Sign-in
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
        variant="contained"
        type="submit"
            fullWidth
            sx={{
              mt: 2,
              color: '#FFF4EA',
              background: "#C96868",
            }}
      >
        Sign in
      </LoadingButton>
      </form>
        </Box>
        {verified ? <Alert sx={{ mt: 1 }} severity="error">{"Credentials invalid"}</Alert> : ""}

      </Box>
      <Copyright />
    </Container>
  );
};

export default Page;
