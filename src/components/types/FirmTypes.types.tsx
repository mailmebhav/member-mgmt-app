export interface FirmData {
    firmId: number,
    firmName: String,
    area: String,
    pincode: number
  }
export type FirmDataProps =
{
  reload: boolean,
}
export interface VerifiedResponseType
{
    status: boolean,
    message: string,
}

export type AddFirmPropsType =
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
