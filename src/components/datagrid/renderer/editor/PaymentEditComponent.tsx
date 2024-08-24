/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Autocomplete, MenuItem, Alert, Box, TextField, Button, useTheme, Typography } from "@mui/material"
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType } from '../../../types/GenericTypes.types'
import { PaymentDetailsEditValidationSchema } from '../../../validation/ValidationScheme'
import { headers } from '@/utils/header';
import { membersAPI, paymentTypeAPI, paymentsAPI } from '@/components/data/URLs';
import { httpPutRequest, httpGetRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import "react-datepicker/src/stylesheets/datepicker.scss"
const PaymentEditComponent = (props: any) => {
    const router = useRouter()
    const [members, setMembers] = React.useState([])
    const [selectedMemberId, setSelectedMemberId] = React.useState<number>(props.data.data.memberId)
    const [token, ] = useLocalStorage("token")
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [paymentTypes, setPaymentTypes] = React.useState([])

    
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        });

        const fetchPaymentTypeList = React.useCallback(() => 
            {
                httpGetRequest(paymentTypeAPI, {...headers, "Authorization": token})
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
                if (error.response.status === 401)
                  {
                      router.push('/login')
                  }
                  setPaymentTypes([])
            })
        },[])
        
       
        const fetchMembersAPIRequest = React.useCallback(() => 
          {     
            httpGetRequest(membersAPI,{...headers, "Authorization": token})
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
 
        React.useEffect(()=>
        {
                fetchMembersAPIRequest()      
                fetchPaymentTypeList()
        },[])
    const formik = useFormik({
        
            initialValues: {
                paymentFor:  props.data.data.paymentFor,
                paymentMode:  props.data.data.paymentMode,
                amount: props.data.data.amount,
                transactionId:  props.data.data.transactionId,
                receiptNumber:  props.data.data.receiptNumber,
                memberName: props.data.data.member.memberName,
                memberId: props.data.data.memberId                
            },
            validationSchema: PaymentDetailsEditValidationSchema,
            onSubmit: (values) => {
              setButtonLoading(true)
              setVerified({
                status: false,
                message: ''
            })
            const requestPayload = {
                paymentId: props.data.data.paymentId,
                paymentMode:  values.paymentMode,
                paymentFor:  values.paymentFor,
                amount: values.amount,
                transactionId:  values.transactionId,
                receiptNumber:  values.receiptNumber,
                memberId: selectedMemberId                   
              }
        
           httpPutRequest(paymentsAPI, requestPayload, {...headers, "Authorization": token})
                .then((response : AxiosResponse) =>  {
                if(response.status === 200)
                {
                    setVerified({
                        status: true,
                        message: 'Payment detail updated Successfully'
                    })
                    const rowNode  = props.data.api.getRowNode(props.data.data.paymentId)
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
                        status: true,
                        message: 'Failed adding new payment detail'
                    })
                }
                
                setButtonLoading(false)
            })
                .catch(function (error: any) {
              setVerified({
                status: true,
                message: 'Error from Server, while adding new payment'
            })
            if(error.response.status)
            {
                router.push('/login')
            }
              setButtonLoading(false)
            });  
          }});   
    
      
            const getValueFromOptions = (value: string) => {
                return (
                  members.find((option: any) => option.memberName === value) ?? null
                );
              };   
const getValueFromPaymemtOptions = (value: string) => {
    return (
        paymentTypes.find((options: any) => options.paymentFor === value ) ?? null
    )
}                       

    return ( 
        <Box sx ={{m: 2}}>
        <form onSubmit={formik.handleSubmit}>
        <Typography component="div" variant="h6" align="center"> Edit Member</Typography>
        
        <Autocomplete
              id="member-autocomplete"
              options={members}
              value={getValueFromOptions(formik.values.memberName)}
              isOptionEqualToValue={(option: any, value) =>             
                    option.memberName === formik.values.memberName
              }
              onChange={(e, value) => 
                {
                    formik.setFieldValue("memberId", value.memberId || "")
                    setSelectedMemberId(value.memberId)
                    formik.setFieldValue("memberName", value.memberName || "")
                }}
              getOptionLabel={(option: any) => option.memberName+" "+option.nokh || ''}
              onOpen={formik.handleBlur}
              includeInputInList
              renderInput={(params: any) => (
              <TextField
                  {...params}
                  size="small"
                  error={Boolean(formik.touched.memberId && formik.errors.memberId)}
                  fullWidth
                  label="memberName"
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
              label="paymentMode"
              value={formik.values.paymentMode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.paymentMode && Boolean(formik.errors.paymentMode)}
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
              value={getValueFromPaymemtOptions(formik.values.paymentFor)}
              isOptionEqualToValue={(option: any, value) =>             
                option.paymentFor === formik.values.paymentFor
              }
              onChange={(e, value) => 
                {
                  formik.setFieldValue("paymentFor", value.paymentFor || "")
                }}
              getOptionLabel={(paymentType: any) => paymentType.paymentFor || ""}
              
    
              onOpen={formik.handleBlur}
              includeInputInList
              renderInput={(params: any) => (
              <TextField
                  {...params}
                  size="small"
                  error={Boolean(formik.touched.paymentFor && formik.errors.paymentFor)}
                  fullWidth
                  helperText              label="paymentFor"
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
              label="amount"
              type='number'
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
            />
            <TextField
            sx={{
                mt: 2
              }}
              fullWidth
              size="small"
              id="transactionId"
              name="transactionId"
              label="transactionId"
              value={formik.values.transactionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.transactionId && Boolean(formik.errors.transactionId)}
            />
            <TextField
                      sx={{
                        mt: 2
                      }}
              fullWidth
              size="small"
              id="receiptNumber"
              name="receiptNumber"
              label="receiptNumber"
              value={formik.values.receiptNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.receiptNumber && Boolean(formik.errors.receiptNumber)}
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
      <Button variant="outlined" onClick={()=> props.onClose()} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
        </form>
        {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
        {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
        </Box>
     );
}
 
export default PaymentEditComponent;