 
const FirmInitialValues = {
  firmName: '',
  area: '',
  pincode: 0,
}
const MemberInitialValues = {
  firmName: '',
  ksmnId: '',
  yskId: '',
  familyId: '',
  memberName: '',
  fatherName: '',
  nokh: '',
  dob: new Date(),
  gender: '',
  bloodGroup: '',
  contact: '',
  contact2: '',
  kutchNative: ''
}

const PaymentDetailsInitialValues = {
  paymentFor: '',
  paymentMode: '',
  amount: '',
  transactionId: '',
  receiptNumber: '',
  memberName: '',
}

const PaymentTypeInitialValues = {
  paymentFor: '',
}
export { FirmInitialValues, MemberInitialValues, PaymentDetailsInitialValues, PaymentTypeInitialValues }