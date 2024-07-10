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

const AddPayment = () => {
  return (
    <div>AddPayment</div>
  )
}

export default AddPayment