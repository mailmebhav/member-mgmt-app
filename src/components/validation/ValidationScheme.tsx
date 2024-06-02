import * as yup from 'yup';
export const FirmValidationSchema = yup.object({
    firmName: yup
      .string()
      .required('firm name is required'),
    area: yup
      .string()
      .required('area is required'),
    pincode: yup
      .number()
      .required('pincode is required'),
  });