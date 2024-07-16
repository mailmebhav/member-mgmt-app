export interface FirmData {
  firmId: number,
  firmName: String,
  area: String,
  pincode: number
}
export type ReloadDataProps =
{
reload: boolean,
}
export interface VerifiedResponseType
{
  status: boolean,
  message: string,
}

export type RefreshPropsType =
{
refresh: Function,
}

export interface MemberData {
firmId: number,
ksmnId: string,
yskId: string,
familyId: string,
memberName: string,
fatherName: string,
nokh: string,
dob: string,
gender: string,
bloodGroup: string,
contact: string,
contact2: string,
kutchNative: string,
firm: any,
}

export interface PaymentDetailsData {
paymentMode:  string,
paymentFor:  string,
amount: string,
transactionId:  string,
receiptNumber:  string,
memberId: number,
member: any,
}
