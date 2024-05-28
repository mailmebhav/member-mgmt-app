import { Member } from "./Member";

export class PaymentDetail {
  paymentId: number = 0;
  paymentMode: String = "";
  paymentFor: String = "";
  amount: number = 0.0;
  transactionId: String = "";
  receiptNumber: String = "";
  memberId: number = 0;
  member: Member = new Member();
}
