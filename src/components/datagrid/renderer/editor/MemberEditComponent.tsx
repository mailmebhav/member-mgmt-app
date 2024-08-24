/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Autocomplete, MenuItem, Alert, Box, TextField, Button, useTheme, Typography } from "@mui/material"
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType } from '../../../types/GenericTypes.types'
import { MemberEditValidationSchema } from '../../../validation/ValidationScheme'
import { headers } from '@/utils/header';
import { membersAPI, firmsAPI } from '@/components/data/URLs';
import { httpPutRequest, httpGetRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import DatePicker from "react-datepicker"
import "react-datepicker/src/stylesheets/datepicker.scss"

const MemberEditComponent = (props: any): any => {
    const router = useRouter()
    const [firms, setFirms] = React.useState([])
    const [selectedFirmId, setSelectedFirmId] = React.useState<string>(props.data.data.firmId)
    const [token, ] = useLocalStorage("token")
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
        const fetchFirmsAPI = React.useCallback(() => 
            {     
              httpGetRequest(firmsAPI,{...headers, "Authorization": token})
                .then((response : AxiosResponse) =>  {
                  if(response.status === 200)
                  {
                    setFirms(response.data.data)
                  }                 
                  else
                  {
                    setFirms([])
                  }  
              })
              .catch(function (error: any) {
                    if(error.response.status === 401)
                      {
                          router.push('/login')
                      }
                    setFirms([])
              })
            },[]) 
            React.useEffect(() => 
            {
                fetchFirmsAPI()
            },[])
    const formik = useFormik({
      initialValues: {
          memberId: props.data.data.memberId,
          firmId: props.data.data.firmId,
          ksmnId: props.data.data.ksmnId,
          yskId: props.data.data.yskId,
          familyId: props.data.data.familyId,
          memberName: props.data.data.memberName,
          fatherName: props.data.data.fatherName,
          nokh: props.data.data.nokh,
          dob: props.data.data.dob,
          gender: props.data.data.gender,
          bloodGroup: props.data.data.bloodGroup,    
          contact: props.data.data.contact,
          contact2: props.data.data.contact2,
          kutchNative: props.data.data.kutchNative,
          firmname: props.data.data.firm.firmName
      },
      validationSchema: MemberEditValidationSchema,
      onSubmit: (values) => {
        setButtonLoading(true)
        setVerified({
          status: false,
          message: ''
      })
      const requestPayload = {
          memberId: props.data.data.memberId,
          firmId: selectedFirmId,
          ksmnId: values.ksmnId,
          yskId: values.yskId,
          familyId: values.familyId,
          memberName: values.memberName,
          fatherName: values.fatherName,
          nokh: values.nokh,
          dob: values.dob,
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          contact: values.contact,
          contact2: values.contact2,
          kutchNative: values.kutchNative,
        }
  
     httpPutRequest(membersAPI, requestPayload, {...headers, "Authorization": token})
     .then((response : AxiosResponse) =>  {
          if(response.status === 200)
          {
              setVerified({
                  status: true,
                  message: 'Member details updated Successfully'
              })
              const rowNode  = props.data.api.getRowNode(props.data.data.memberId)
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
                  message: 'Failed adding new member'
              })
          }
          
          setButtonLoading(false)
      }).catch(function (error: any) {
        console.log(error)
        setVerified({
          status: false,
          message: 'Error from Server, while adding new firm'
      })
        setButtonLoading(false)
      });  
    }});
  
    const getValueFromOptions = (value: string) => {
      return (
        firms.find((option: any) => option.firmName === value) ?? null
      );
    };
    return ( 
        <Box sx ={{m: 2}}>
        <form onSubmit={formik.handleSubmit}>
        <Typography component="div" variant="h6" align="center"> Edit Member</Typography>
        
        <Autocomplete
              id="contact-autocomplete"
              options={firms}
              value={getValueFromOptions(formik.values.firmname)}
              isOptionEqualToValue={(option: any, value) =>             
                  option.firmName === formik.values.firmname
                }
              onChange={(e, value) => 
              {
                  formik.setFieldValue("firmId", value.firmId || "")
                  setSelectedFirmId(value.firmId)
                  formik.setFieldValue("firmname", value.firmName || "")
              }}
              onOpen={formik.handleBlur}
              includeInputInList
              getOptionLabel={(option) => option.firmName || ''}
              renderInput={(params: any) => (
              <TextField
                  {...params}
                  error={Boolean(formik.touched.firmId && formik.errors.firmId)}
                  fullWidth
                  label="Firm name"
                  name="firm name"
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
          id="ksmnId"
          name="ksmnId"
          label="KSMN Id"
          value={formik.values.ksmnId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.ksmnId && Boolean(formik.errors.ksmnId)}
        />
        <TextField
                  sx={{
                    mt: 2
                  }}
          fullWidth
          size="small"
          id="yskId"
          name="yskId"
          label="YSK Id"
          value={formik.values.yskId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.yskId && Boolean(formik.errors.yskId)}
        />
        <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="familyId"
            name="familyId"
            label="Family Id"
            value={formik.values.familyId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.familyId && Boolean(formik.errors.familyId)}
          />
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="memberName"
            name="memberName"
            label="Member Name"
            value={formik.values.memberName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.memberName && Boolean(formik.errors.memberName)}
          />
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="fatherName"
            name="fatherName"
            label="Father Name"
            value={formik.values.fatherName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
          />
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="nokh"
            name="nokh"
            label="Nokh"
            value={formik.values.nokh}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nokh && Boolean(formik.errors.nokh)}
          />
          <div style={{padding: 2}}>
          <span style={{fontSize: 11, marginRight: '3px'}}>Date of birth</span>
          <DatePicker 
           name="dateOfBirth"
           selected={(formik.values.dob)}
           onChange={(value: any) => {
            formik.setFieldValue("dob", value)}
           }
          />
          </div>
          <TextField
              sx={{
                mt: 2
              }}
              select
            fullWidth
            size="small"
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
        <MenuItem value={'M'}>Male</MenuItem>
        <MenuItem value={'F'}>Female</MenuItem>
    
    </TextField>
          <TextField
              sx={{
                mt: 2
              }}
              select
            fullWidth
            size="small"
            id="bloodGroup"
            name="bloodGroup"
            label="Blood Group"
            value={formik.values.bloodGroup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
          >
        <MenuItem value={'na'}>NA</MenuItem>
        <MenuItem value={'A+'}>A+</MenuItem>
        <MenuItem value={'A-'}>A-</MenuItem>
        <MenuItem value={'B+'}>B+</MenuItem>
        <MenuItem value={'B-'}>B-</MenuItem>
        <MenuItem value={'AB+'}>AB+</MenuItem>
        <MenuItem value={'AB-'}>AB-</MenuItem>
        <MenuItem value={'O+'}>O+</MenuItem>
        <MenuItem value={'O-'}>O-</MenuItem>
    </TextField>
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="contact"
            name="contact"
            label="Contact"
            type='number'
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
          />
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="contact2"
            name="contact2"
            label="Contact 2"
            type='number'
            value={formik.values.contact2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contact2 && Boolean(formik.errors.contact2)}
          />
          <TextField
              sx={{
                mt: 2
              }}
            fullWidth
            size="small"
            id="kutchNative"
            name="kutchNative"
            label="Kutch Native"
            value={formik.values.kutchNative}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.kutchNative && Boolean(formik.errors.kutchNative)}
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
      <Button variant="outlined" onClick={()=>props.onClose()} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
        </form>
        {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
        {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
        </Box>
     );
}
 
export default MemberEditComponent;
