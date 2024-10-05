import { Firm } from "./Firm";

export class Member {
  memberId: number = 0;
  firm: Firm = new Firm();
  firmId: number = 0;
  ksmnId: String = "";
  yskId: String = "";
  familyId: String = "";
  memberName: String = "";
  fatherName: String = "";
  nokh: String = "";
  dob: Date = new Date();
  gender: String = "";
  bloodGroup: String = "";
  contact: String = "";
  contact2: String = "";
  kutchNative: String = "";
  activeMember: boolean = true;
}
