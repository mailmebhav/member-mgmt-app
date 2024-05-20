import { Member } from "./Member";

export class Firm {
    firmId: number = 0;
    firmName: String = "";
    area: String = "";
    pincode: number = 0;
    members: Member[] = [];
}