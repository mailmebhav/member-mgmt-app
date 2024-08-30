import React from 'react'
import { Alert, Box, TextField, Button, useTheme, Typography } from "@mui/material"
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType } from '../../../types/GenericTypes.types'
import { FirmValidationSchema } from '../../../validation/ValidationScheme'
import { headers } from '@/utils/header';
import { firmsAPI } from '../../../data/URLs'
import { httpPutRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'; 
const FirmEditComponent = (props: any) => {
    const mytheme = useTheme()
    const router = useRouter()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [token, ] = useLocalStorage("token")
    const closeDialog = () =>
    {
        ()=>props.onClose()
    }
    const formik = useFormik({
      initialValues: {
        firmId: props.data.data.firmId,
        firmName: props.data.data.firmName,
        area: props.data.data.area,
        pincode: props.data.data.pincode
      },
      validationSchema: FirmValidationSchema,
      onSubmit: (values) => {
        setButtonLoading(true)
        setVerified({
          status: false,
          message: ''
      })
      console.log('hello')
      const requestPayload = {
          firmId: props.data.data.firmId,
          firmName: values.firmName,
          area: values.area,
          pincode: values.pincode === ''? 0 : values.pincode,
        }
  
     httpPutRequest(firmsAPI, requestPayload, {...headers, "Authorization": token})
          .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
              setVerified({
                  status: true,
                  message: 'Firm details updated Successfully'
              })
              const rowNode  = props.data.api.getRowNode(props.data.data.firmId)
              rowNode.setData(response.data.data)
              setTimeout(()=>
              {
                  setVerified({
                    status: false,
                    message: ''
                })
            }
              ,1000) 
              
          }
          else
          {
              setVerified({
                  status: false,
                  message: 'Failed adding new firm'
              })
          }          
          
          setButtonLoading(false)
      })
          .catch(function (error: any) {
            if(error.response.status === 401)
            {
                router.push('/login')
            }
        setVerified({
          status: false,
          message: 'Error from Server, while adding new firm'
      })
        setButtonLoading(false)
      });  
    }});
    return (
        <Box sx ={{m: 2}}>
    <form onSubmit={formik.handleSubmit}>
    <Typography component="div" variant="h6" align="center"> Edit firm</Typography>
    <TextField
      sx={{
        mt: 2
      }}
      fullWidth
      size="small"
      id="firmName"
      name="firmName"
      label="Firm name"
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
      label="Area"
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
      label="Pincode"
      type='number'
      value={formik.values.pincode !== 0 ? formik.values.pincode : ''}
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
  <Button variant="outlined" onClick={()=>props.onClose()} fullWidth sx={{ mt: 1, mb: 1 }}>Close</Button>
    </form>
    {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
    {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
    </Box>
      );
}
 
export default FirmEditComponent;