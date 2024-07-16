/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { Alert, Chip, Box, Dialog, DialogTitle, TextField, Button, useTheme, Typography, Stack } from "@mui/material"
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, RefreshPropsType } from '../types/GenericTypes.types'
import { PaymentTypeInitialValues } from '../data/InitialValues';
import { PaymentTypeValidationSchema } from '../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { paymentTypeAPI } from '../data/URLs';
import { httpPostRequest, httpGetRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

const AddPaymentType = (props: RefreshPropsType) => {
    const mytheme = useTheme()
    const router = useRouter()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [refresh, setRefresh] = React.useState(false)   
    const [value, ] = useLocalStorage("token")
    const [paymentTypes, setPaymentTypes] = React.useState([])
    const [addPaymentTypeOpen, setaddPaymentTypeOpen] = React.useState(false)
    const handleClickAddPaymentTypeOpen = (): void => {
        setaddPaymentTypeOpen(true);
      }
    
      const handleClickAddPaymentTypeClose = (): void => {
        setaddPaymentTypeOpen(false);
      }

    const fetchPaymentTypeList = React.useCallback(() => 
    {
        httpGetRequest(paymentTypeAPI, {...headers, "Authorization": value})
        .then((response : AxiosResponse) =>  {
        if(response.status === 200)
        {
            setPaymentTypes(response.data.data)
        }
        else
        {
            setPaymentTypes([])
        }            
    }).catch(function (error: any) {
        console.log(error)

        if (error.response.status === 401)
          {
              router.push('/login')
          }
          setPaymentTypes([])
    })
},[])

React.useEffect(()=>
  {
    if(props.refresh() !== refresh)
    {
      fetchPaymentTypeList()
      setRefresh(props.refresh())
    }
  },[props.refresh])
      const formik = useFormik({
        initialValues: PaymentTypeInitialValues,
        validationSchema: PaymentTypeValidationSchema,
        onSubmit: (values, { resetForm }) => {
          setButtonLoading(true)
          setVerified({
            status: false,
            message: ''
        })
        
        const requestPayload = {
            paymentFor: values.paymentFor,            
          }
        if(paymentTypes.findIndex((p: any) => p.paymentFor === values.paymentFor) > -1)
        {
            setVerified({
                status: false,
                message: 'Already Exist !!  Try again.'
            })
            setButtonLoading(false)       
        }
        else{
            httpPostRequest(paymentTypeAPI, requestPayload, {...headers, "Authorization": value})
            .then((response : AxiosResponse) =>  {
            if(response.status === 201)
            {
                setVerified({
                    status: true,
                    message: 'New Payment Type added Successfully'
                })
                props.refresh()
                fetchPaymentTypeList()
                resetForm()                
            }
            else
            {
                setVerified({
                    status: false,
                    message: 'Failed adding new payment type'
                })
            }            
            setButtonLoading(false)
        }).catch(function (error: any) {
          setVerified({
            status: true,
            message: 'Error from Server, while adding new firm'
        })
        if (error.response.status === 401)
          {
              router.push('/login')
          }
          setPaymentTypes([])
          setButtonLoading(false)
        }); 
        }
        
      }});

   
    return ( 
        <React.Fragment>
        <Button variant="contained" size="small" sx={{color: 'white', borderRadius: 2, marginTop: 1, background: `${mytheme.palette.primary.main}`}}
                      onClick={handleClickAddPaymentTypeOpen}
                      >
                          Add Payment Type
                      </Button>
        <Dialog
          open={addPaymentTypeOpen}
          onClose={handleClickAddPaymentTypeClose}
        >
          <DialogTitle>Add New Payment Types</DialogTitle>
          <Box sx ={{m: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ border: '1px solid orange', borderRadius: 1, mb: 2, height: '20vh', overflow: 'scroll' }}>
            <Typography  variant="body2" align="center" sx={{ borderBottom: '1px solid orange', borderRadius: 0 }}>
                Existing Payment Type List
            </Typography>

                {paymentTypes &&
                    paymentTypes.map((paymentType: any, index: Number): React.ReactElement =>
                    {
                       return  <Chip color="info" key={paymentType+"-"+index} sx={{borderRadius: 1, fontSize: 12, m: 1, p: 0.5, }} label={paymentType.paymentFor} />
                    })}                                 
            </Box>
            <Typography  variant="body1" align="center" sx={{ borderRadius: 2, background: 'lightgray', color: 'black', border: '1px solid white' }}>
                Enter new Payment Type
                 </Typography>
                <TextField
          sx={{            
              mt: 2,
              mb: 1,
            }}
            fullWidth
            size="small"
            id="paymentFor"
            name="paymentFor"
            label="Payment type"
            value={formik.values.paymentFor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.paymentFor && Boolean(formik.errors.paymentFor)}
            helperText={formik.touched.paymentFor && formik.errors.paymentFor}
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
        <Button variant="outlined" onClick={handleClickAddPaymentTypeClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
          </form>
          {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
          {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
          </Box>
        </Dialog>
      </React.Fragment>
     );
}
 
export default AddPaymentType
