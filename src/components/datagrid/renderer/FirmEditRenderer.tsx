import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { IconButton, Alert, Box, Dialog, TextField, Button, useTheme, Typography } from "@mui/material"
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, FirmData } from '../../types/FirmTypes.types'
import { FirmValidationSchema } from '../../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { firmsAPI } from '../../data/URLs';
import { httpPutRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"

const FirmEditRenderer = (props: FirmData | any): any => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [token, ] = useLocalStorage("token")
    const formik = useFormik({
      initialValues: {
        firmId: props.data.firmId,
        firmName: props.data.firmName,
        area: props.data.area,
        pincode: props.data.pincode
      },
      validationSchema: FirmValidationSchema,
      onSubmit: (values) => {
        setButtonLoading(true)
        setVerified({
          status: false,
          message: ''
      })
      
      const requestPayload = {
          firmId: props.data.firmId,
          firmName: values.firmName,
          area: values.area,
          pincode: values.pincode,
        }
  
     httpPutRequest(firmsAPI, requestPayload, {...headers, "Authorization": token})
          .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
              setVerified({
                  status: true,
                  message: 'Firm details updated Successfully'
              })
              const rowNode  = props.api.getRowNode(props.data.firmId)
              rowNode.setData(response.data.data)
              setTimeout(()=>
              {
                  onClose()
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
      <>
        <IconButton onClick={() => setOpen(true)}><EditNoteIcon /></IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
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
  <Button variant="outlined" onClick={onClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
    </form>
    {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
    {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
    </Box>
        </Dialog>
      </>
    );
  }

export default FirmEditRenderer