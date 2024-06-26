import * as React from 'react'
import { Alert, Box, Dialog, DialogTitle, TextField, Button, useTheme } from "@mui/material"
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, AddFirmPropsType } from '../types/FirmTypes.types'
import { FirmInitialValues } from '../data/InitialValues';
import { FirmValidationSchema } from '../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { firmsAPI } from '../data/URLs';
import { httpPostRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"

export default function AddFirm(props: AddFirmPropsType) {
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [value, ] = useLocalStorage("token")
    const [addfirmopen, setAddfirmopen] = React.useState(false)

    const handleClickAddFrimOpen = () => {
        setAddfirmopen(true);
      }
    
      const handleAddFrimClose = () => {
        setAddfirmopen(false);
      }

      const formik = useFormik({
        initialValues: FirmInitialValues,
        validationSchema: FirmValidationSchema,
        onSubmit: (values, { resetForm }) => {
          setButtonLoading(true)
          setVerified({
            status: false,
            message: ''
        })
        
        const requestPayload = {
            firmName: values.firmname,
            area: values.area,
            pincode: values.pincode,
          }

       httpPostRequest(firmsAPI, requestPayload, {...headers, "Authorization": value})
            .then((response : AxiosResponse) =>  {
            if(response.status === 201)
            {
                setVerified({
                    status: true,
                    message: 'New firm added Successfully'
                })
                props.refresh()
                setTimeout(()=>
                {
                    handleAddFrimClose()
                    setVerified({
                      status: false,
                      message: ''
                  })
                  resetForm()
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
    <React.Fragment>
      <Button variant="contained" size="small" sx={{color: 'white', background: `${mytheme.palette.primary.main}`}}
                    onClick={handleClickAddFrimOpen}
                    >
                        Add Firm
                    </Button>
      <Dialog
        open={addfirmopen}
        onClose={handleAddFrimClose}
      >
        <DialogTitle>Add New Firm</DialogTitle>
        <Box sx ={{m: 2}}>
        <form onSubmit={formik.handleSubmit}>

        <TextField
        sx={{
            mt: 2
          }}
          fullWidth
          size="small"
          id="firmname"
          name="firmname"
          label="firmname"
          value={formik.values.firmname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firmname && Boolean(formik.errors.firmname)}
          helperText={formik.touched.firmname && formik.errors.firmname}
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
          helperText={formik.touched.area && formik.errors.area}
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
          helperText={formik.touched.pincode && formik.errors.pincode}
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
        Add
      </LoadingButton>
      <Button variant="outlined" onClick={handleAddFrimClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
        </form>
        {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
        {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}