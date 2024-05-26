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