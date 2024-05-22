import * as React from 'react'
import { Alert, Box, Dialog, DialogTitle, TextField, Button, useTheme } from "@mui/material"
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton'
import axios, { AxiosResponse } from "axios";

interface verifiedResponse
{
    status: boolean,
    message: string,
}

const validationSchema = yup.object({
    firmname: yup
      .string()
      .required('firm name is required'),
    area: yup
      .string()
      .required('area is required'),
    pincode: yup
      .number()
      .required('pincode is required'),
  });
export default function AddFirm() {
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<verifiedResponse>(
        {
            status: false,
            message: ''
        }
        );
  
    const [addfirmopen, setAddfirmopen] = React.useState(false)
    const handleClickAddFrimOpen = () => {
        setAddfirmopen(true);
      }
    
      const handleAddFrimClose = () => {
        setAddfirmopen(false);
      }

      const formik = useFormik({
        initialValues: {
            firmname: '',
            area: '',
            pincode: null,
          },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          setButtonLoading(true)
          setVerified({
            status: false,
            message: ''
        })
        const request = {
            firmName: values.firmname,
            area: values.area,
            pincode: values.pincode,
          }
          console.log(request)
        const requestPayloadWithHeader = {
          method: 'POST',
          url: 'http://localhost:3000/api/firm',
          data: request,
          headers: {
            "Content-Type": "application/json" 
           },
        }
       
        axios
            .request(requestPayloadWithHeader)
            .then((response : AxiosResponse) =>  {
          console.log(response)
            if(response.status === 201)
            {
                setVerified({
                    status: true,
                    message: 'New firm added Successfully'
                })
                setTimeout(()=>
                {
                    handleAddFrimClose()
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
      }
      });

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
        </form>
        {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
        {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}