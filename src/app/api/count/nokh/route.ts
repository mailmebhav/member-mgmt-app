import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../../lib/prisma";
import { createApiResponseObject, unauthorizedResponse } from "@/utils/responseHandlers";
import { validateToken } from "@/utils/validationUtil";
import { insertAuditTrailTransaction } from "@/utils/auditTrailUtil";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let nokhCount = (await prisma.member.groupBy({
    by: "nokh",
    _count: true,
   }));

   try {
    insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

   return NextResponse.json(createApiResponseObject("OK", "", nokhCount));
}