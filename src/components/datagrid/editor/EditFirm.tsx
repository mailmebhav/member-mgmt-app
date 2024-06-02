import * as React from 'react'
import { Alert, Box, Dialog, DialogTitle, TextField, Button, useTheme } from "@mui/material"
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, FirmData } from '../../types/FirmTypes.types'
import { FirmValidationSchema } from '../../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { firmsAPI } from '../../data/URLs';
import { httpPutRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"

const EditFirm = ({firmValue, onClose}: any) => {
  const mytheme = useTheme()
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [verified, setVerified] = React.useState<VerifiedResponseType>(
      {
          status: false,
          message: ''
      }
      );
  const [token, ] = useLocalStorage("token")


  const handleAddFrimClose = (): void => {
    onClose()
  }

  const formik = useFormik({
    initialValues: {
      firmId: firmValue.firmId,
      firmName: firmValue.firmName,
      area: firmValue.area,
      pincode: firmValue.pincode
    },
    validationSchema: FirmValidationSchema,
    onSubmit: (values) => {
      console.log('hi')
      setButtonLoading(true)
      setVerified({
        status: false,
        message: ''
    })
    
    const requestPayload = {
        firmId: firmValue.firmId,
        firmName: values.firmName,
        area: values.area,
        pincode: values.pincode,
      }

   httpPutRequest(firmsAPI, requestPayload, {...headers, "Authorization": token})
        .then((response : AxiosResponse) =>  {
        if(response.status === 201)
        {
            setVerified({
                status: true,
                message: 'New firm added Successfully'
            })
            setTimeout(()=>
            {
                handleAddFrimClose()
                setVerified({
                  status: false,
                  message: ''
              })
            }
            ,2000) 
        }
        else
        {
            setVerified({
                status: true,
                message: 'Failed adding new firm'
            })
        }
        
        setButtonLoading(false)
    })
        .catch(function (error: any) {
      setVerified({
        status: true,
        message: 'Error from Server, while adding new firm'
    })
      setButtonLoading(false)
    });  
  }});

  return (
    <Box sx ={{m: 2}}>
    <form onSubmit={formik.handleSubmit}>
    <TextField
      sx={{
        mt: 2
      }}
      fullWidth
      size="small"
      id="firmName"
      name="firmName"
      label="firmName"
      value={formik.values.firmName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.firmName && Boolean(formik.errors.firmName)}
    />
    <TextField
              sx={{
                mt: 2
              }}
      fullWidth
      size="small"
      id="area"
      name="area"
      label="area"
      value={formik.values.area}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.area && Boolean(formik.errors.area)}
    />
    <TextField
              sx={{
                mt: 2
              }}
      fullWidth
      size="small"
      id="pincode"
      name="pincode"
      label="pincode"
      type='number'
      value={formik.values.pincode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.pincode && Boolean(formik.errors.pincode)}
    />
    <LoadingButton
    loading={buttonLoading}
    loadingPosition="start"
    variant="contained"
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
    Edit
  </LoadingButton>
  <Button variant="outlined" onClick={handleAddFrimClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
    </form>
    {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
    {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
    </Box>
  )
}

export default EditFirm