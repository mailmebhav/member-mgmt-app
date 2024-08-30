/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Autocomplete, Alert, Box, Dialog, DialogTitle, TextField, Button, useTheme ,MenuItem} from "@mui/material"
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton'
import { AxiosResponse } from "axios";
import { VerifiedResponseType, RefreshPropsType } from '../types/GenericTypes.types'
import { MemberInitialValues } from '../data/InitialValues';
import { MemberValidationSchema } from '../validation/ValidationScheme';
import { headers } from '@/utils/header';
import { membersAPI, firmsAPI } from '../data/URLs';
import { httpPostRequest, httpGetRequest } from '@/utils/httputils';
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'
import DatePicker from "react-datepicker"

export default function AddMember(props: RefreshPropsType) {
    const router = useRouter()
    const mytheme = useTheme()
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [verified, setVerified] = React.useState<VerifiedResponseType>(
        {
            status: false,
            message: ''
        }
        );
    const [value, ] = useLocalStorage("token")
    const [firms, setFirms] = React.useState([])
    const [addMemberopen, setAddMemberopen] = React.useState(false)
    const [selectedFirmId, setSelectedFirmId] = React.useState<string | null>(null)
    const handleClickAddMemberOpen = (): void => {
        setAddMemberopen(true);
    }
    
    const handleAddMemberClose = (): void => {
        setAddMemberopen(false);
    }
    useEffect(()=>
    {
        fetchAPIRequest()      
    },[])
    const fetchAPIRequest = React.useCallback(() => 
      {     
        httpGetRequest(firmsAPI,{...headers, "Authorization": value})
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
          if (error.response.status === 401)
            {
                router.push('/login')
            }
              setFirms([])
        })
      },[]) 

    
    const formik = useFormik({
        initialValues: MemberInitialValues,
        validationSchema: MemberValidationSchema,
        onSubmit: (values, { resetForm }) => {
          setButtonLoading(true)
          setVerified({
            status: false,
            message: ''
        })
        
        const requestPayload = {
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
          kutchNative: values.kutchNative
          }
          
       httpPostRequest(membersAPI, requestPayload, {...headers, "Authorization": value})
            .then((response : AxiosResponse) =>  {
            if(response.status === 201)
            {
                setVerified({
                    status: true,
                    message: 'New Member added Successfully'
                })
                props.refresh()
                setTimeout(()=>
                {
                    handleAddMemberClose()
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
                    message: 'Failed adding new member !!'
                })
            }
            
            setButtonLoading(false)
        })
            .catch(function (error: any) {
              if (error.response.status === 401)
                {
                    router.push('/login')
                }
          setVerified({
            status: true,
            message: 'Error from Server, while adding new member !!'
        })
          setButtonLoading(false)
        });  
      }});

  return (
    <React.Fragment>
    <Button variant="contained" size="small" sx={{color: 'white', borderRadius: 2, marginTop: 1, background: `${mytheme.palette.primary.main}`}}
                  onClick={handleClickAddMemberOpen}
                  >
                      Add Member
                  </Button>
    <Dialog
      open={addMemberopen}
      onClose={handleAddMemberClose}
    >
      <DialogTitle>Add New Member</DialogTitle>
      <Box sx ={{m: 2}}>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          id="contact-autocomplete"
          options={firms}
          getOptionLabel={(firm: any) => firm.firmName }
          onChange={(e, value) => 
            {
              formik.setFieldValue("firmName", value.firmName || "")
              setSelectedFirmId(value.firmId)
            }}

          onOpen={formik.handleBlur}
          includeInputInList
          renderInput={(params: any) => (
          <TextField
              {...params}
              error={Boolean(formik.touched.firmName && formik.errors.firmName)}
              fullWidth
              helperText={formik.touched.firmName && formik.errors.firmName}
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
        id="memberName"
        name="memberName"
        label="Member name"
        value={formik.values.memberName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.memberName && Boolean(formik.errors.memberName)}
        helperText={formik.touched.memberName && formik.errors.memberName}
      />
      <TextField
          sx={{
            mt: 2
          }}
        fullWidth
        size="small"
        id="fatherName"
        name="fatherName"
        label="Father name"
        value={formik.values.fatherName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
        helperText={formik.touched.fatherName && formik.errors.fatherName}
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
        helperText={formik.touched.nokh && formik.errors.nokh}
      />
      <div style={{padding: 2}}>
      <span style={{fontSize: 11, marginRight: '3px'}}>Date of birth</span>
      <DatePicker 
       name="dateOfBirth"
       selected={(formik.values.dob)}
       onChange={value => {
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
        helperText={formik.touched.gender && formik.errors.gender}
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
        label="Blood group"
        value={formik.values.bloodGroup}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
        helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
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
        helperText={formik.touched.contact && formik.errors.contact}
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
        helperText={formik.touched.contact2 && formik.errors.contact2}
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
        helperText={formik.touched.kutchNative && formik.errors.kutchNative}
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
        helperText={formik.touched.ksmnId && formik.errors.ksmnId}
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
        helperText={formik.touched.yskId && formik.errors.yskId}
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
        helperText={formik.touched.familyId && formik.errors.familyId}
      />
      {/* <TextField
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
      /> */}
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
    <Button variant="outlined" onClick={handleAddMemberClose} fullWidth sx={{ mt: 1, mb: 1 }} >Close</Button>
      </form>
      {verified.status && verified.message && <Alert severity="success">{verified.message}</Alert>}
      {!verified.status && verified.message && <Alert severity="error">{verified.message}</Alert>}
      </Box>
    </Dialog>
  </React.Fragment>

  )
}

