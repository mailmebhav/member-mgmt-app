import * as yup from 'yup';

export const LoginValidationSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required("password is required"),
})
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

  export const MemberEditValidationSchema = yup.object({
    memberId: yup
      .string()
      .required('member id is required'),
    firmId: yup
      .string()
      .required('firm id is required'),
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

  export const PaymentTypeValidationSchema = yup.object({
    paymentFor: yup
      .string()
      .required('payment for is required'),   
  });
  export const PaymentDetailsValidationSchema = yup.object({
    paymentMode: yup
      .string()
      .required('payment mode is required'),
    paymentFor: yup
      .string()
      .required('payment for is required'),
    amount: yup
      .number()
      .required('amount is required'),
    transactionId: yup
      .string()
      .required('transactionId is required'),
    receiptNumber: yup
      .string()
      .required('receiptNumber is required'),
    memberName: yup
      .string()
      .required('memeberName is required'),
  });

  export const PaymentDetailsEditValidationSchema = yup.object({
    paymentMode: yup
      .string()
      .required('payment mode is required'),
    paymentFor: yup
      .string()
      .required('payment for is required'),
    amount: yup
      .number()
      .required('amount is required'),
    transactionId: yup
      .string()
      .required('transactionId is required'),
    receiptNumber: yup
      .string()
      .required('receiptNumber is required'),
    memberId: yup
      .number()
      .required('member id is required'),
    memberName: yup
      .string()
      .required('memeberName is required'),
  });
