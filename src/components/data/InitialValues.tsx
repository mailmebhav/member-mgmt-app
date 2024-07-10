import dayjs, { Dayjs } from 'dayjs' 
const FirmInitialValues = {
    firmName: '',
    area: '',
    pincode: null,
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

export { FirmInitialValues, MemberInitialValues }