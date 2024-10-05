import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../lib/prisma";
import { createApiResponseObject, unauthorizedResponse } from "@/utils/responseHandlers";
import { validateToken } from "@/utils/validationUtil";
import { CountResponse } from "@/app/model/CountResponse";
import { insertAuditTrailTransaction } from "@/utils/auditTrailUtil";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let firmsCount = await prisma.firm.count();
  let membersCount = await prisma.member.count();
  let maleMemberCount = (await prisma.member.groupBy({
      where: { gender: "M" },
      orderBy: undefined,
      by: "memberId"
  })).length;
  let femaleMemberCount = (await prisma.member.groupBy({
    where: { gender: "F" },
    orderBy: undefined,
    by: "memberId"
})).length;
  let count: CountResponse = new CountResponse();
  count.firmCount = firmsCount; 
  count.memberCount = membersCount;
  count.maleMemberCount = maleMemberCount;
  count.femaleMemberCount = femaleMemberCount;

  try {
    insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

  return NextResponse.json(createApiResponseObject("OK", "", count));
}