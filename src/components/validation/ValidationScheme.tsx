import * as yup from 'yup';
export const FirmValidationSchema = yup.object({
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

  export const MemberValidationSchema = yup.object({
    firmName: yup
      .string()
      .required('firm Name is required'),
    ksmnId: yup
      .string(),
    yskId: yup
      .string(),
    familyId: yup
      .string(),
    memberName: yup
    .string()
    .required('member name is required'),
    fatherName: yup
    .string()
    .required('father name is required'),
    nokh: yup
    .string()
    .required('nokh is required'),
    dob: yup
    .date()
    .required('Birth date is required'),
    gender: yup
    .string()
    .required('gender is required'),
    bloodGroup: yup
    .string(),
    contact: yup
    .string()
    .max(15)
    .min(10)
    .required('mobile number is required'),
    contact2: yup
    .string(),
    kutchNative: yup
    .string(),
  });