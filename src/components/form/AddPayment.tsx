
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { Autocomplete, MenuItem, Alert, Box, Dialog, DialogTitle, TextField, Button, useTheme } from "@mui/material"
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, RefreshPropsType } from '../types/GenericTypes.types'
import { PaymentDetailsInitialValues } from '../data/InitialValues';
import { PaymentDetailsValidationSchema } from '../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { membersAPI, paymentsAPI, paymentTypeAPI } from '../data/URLs';
import { httpPostRequest, httpGetRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

const AddPayment = (props: RefreshPropsType)  => {
    const mytheme = useTheme()
    const router = useRouter()
    const [refresh, setRefresh] = React.useState(false)   
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [members, setMembers] = React.useState([])
    const [paymentTypes, setPaymentTypes] = React.useState([])
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [value, ] = useLocalStorage("token")
    const [addPaymentopen, setAddPaymentopen] = React.useState(false)
    const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null)

    const handleClickAddPaymentOpen = (): void => {
        setAddPaymentopen(true);
      }
    
      const handleAddPaymentClose = (): void => {
        setAddPaymentopen(false);
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
              fetchMembersAPIRequest()      
              fetchPaymentTypeList()
              setRefresh(props.refresh())
            }
          },[props.refresh])
        const fetchMembersAPIRequest = React.useCallback(() => 
          {     
            httpGetRequest(membersAPI,{...headers, "Authorization": value})
              .then((response : AxiosResponse) =>  {
                if(response.status === 200)
                {
                  setMembers(response.data.data)
                }                
                else
                {
                    setMembers([])
                }  
            })
            .catch(function (error: any) {
                setMembers([])
                if (error.response.status === 401)
                {
                        router.push('/login')
                }
            })
          },[]) 

      const formik = useFormik({
        initialValues: PaymentDetailsInitialValues,
        validationSchema: PaymentDetailsValidationSchema,
        onSubmit: (values, { resetForm }) => {
          setButtonLoading(true)
          setVerified({
            status: false,
            message: ''
        })
        
        const requestPayload = {
            paymentMode:  values.paymentMode,
            paymentFor:  values.paymentFor,
            amount: values.amount,
            transactionId:  values.transactionId,
            receiptNumber:  values.receiptNumber,
            memberId: selectedMemberId,
          }

       httpPostRequest(paymentsAPI, requestPayload, {...headers, "Authorization": value})
            .then((response : AxiosResponse) =>  {
            if(response.status === 201)
            {
                setVerified({
                    status: true,
                    message: 'New payment added Successfully'
                })
                props.refresh()
                setTimeout(()=>
                {
                    handleAddPaymentClose()
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
                    status: false,
                    message: 'Failed adding new payment'
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
            message: 'Error from Server, while adding new payment'
        })
          setButtonLoading(false)
        });  
      }});

  return (
    <React.Fragment>
      <Button variant="contained" size="small" sx={{color: 'white', borderRadius: 2, marginTop: 1, background: `${mytheme.palette.primary.main}`}}
                    onClick={handleClickAddPaymentOpen}
                    >
                        Record Payment
                    </Button>
      <Dialog
        open={addPaymentopen}
        onClose={handleAddPaymentClose}
      >
        <DialogTitle>Add New Payment detail</DialogTitle>
        <Box sx ={{m: 2}}>
        <form onSubmit={formik.handleSubmit}>

        <Autocomplete
          id="member-autocomplete"
          options={members}
          getOptionLabel={(member: any) => member.memberName+" "+member.nokh }
          onChange={(e, value) => 
            {
              formik.setFieldValue("memberName", value.memberName || "")
              setSelectedMemberId(value.memberId)
            }}

          onOpen={formik.handleBlur}
          includeInputInList
          renderInput={(params: any) => (
          <TextField
              {...params}
              size="small"
              error={Boolean(formik.touched.memberName && formik.errors.memberName)}
              fullWidth
              helperText={formik.touched.memberName && formik.errors.memberName}
              label="Member name"
              name="memberName"
              variant="outlined"
          />
    )}
/>

        <TextField
        sx={{
            mt: 2
          }}
          select
          fullWidth
          size="small"
          id="paymentMode"
          name="paymentMode"
          label="Payment mode"
          value={formik.values.paymentMode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.paymentMode && Boolean(formik.errors.paymentMode)}
          helperText={formik.touched.paymentMode && formik.errors.paymentMode}
        >
                <MenuItem value={'Cash'}>Cash</MenuItem>
                <MenuItem value={'Netbanking'}>Netbanking</MenuItem>
                <MenuItem value={'UPI'}>UPI</MenuItem>
                <MenuItem value={'Cards'}>Cards</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
            </TextField>

            <Autocomplete
            sx={{
                mt: 2
              }}
          id="paymentFor-autocomplete"
          options={paymentTypes}
          getOptionLabel={(paymentType: any) => paymentType.paymentFor}
          onChange={(e, value) => 
            {
              formik.setFieldValue("paymentFor", value.paymentFor || "")
            }}

          onOpen={formik.handleBlur}
          includeInputInList
          renderInput={(params: any) => (
          <TextField
              {...params}
              size="small"
              error={Boolean(formik.touched.paymentFor && formik.errors.paymentFor)}
              fullWidth
              helperText={formik.touched.paymentFor && formik.errors.paymentFor}
              label="Payment For"
              name="paymentFor"
              variant="outlined"
          />
    )}
/>
        <TextField
                  sx={{
                    mt: 2
                  }}
          fullWidth
          size="small"
          id="amount"
          name="amount"
          label="Amount"
          type='number'
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <TextField
        sx={{
            mt: 2
          }}
          fullWidth
          size="small"
          id="transactionId"
          name="transactionId"
          label="Transaction Id"
          value={formik.values.transactionId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.transactionId && Boolean(formik.errors.transactionId)}
          helperText={formik.touched.transactionId && formik.errors.transactionId}
        />
        <TextField
                  sx={{
                    mt: 2
                  }}
          fullWidth
          size="small"
          id="receiptNumber"
          name="receiptNumber"
          label="Receipt Number"
          value={formik.values.receiptNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.receiptNumber && Boolean(formik.errors.receiptNumber)}
          helperText={formik.touched.receiptNumber && formik.errors.receiptNumber}
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
      <Button variant="outlined" onClick={handleAddPaymentClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
        </form>
        {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
        {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
export default React.memo(AddPayment)
