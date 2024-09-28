import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../../lib/prisma";
import { validateToken } from "@/utils/validationUtil";
import { createApiResponseObject, unauthorizedResponse } from "@/utils/responseHandlers";
import { insertAuditTrailTransaction } from "@/utils/auditTrailUtil";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  const firms = await prisma.firm.findMany({
    where: {
      activeFirm: false,
    },
  });

  try {
    await insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

  return NextResponse.json(createApiResponseObject("OK", "", firms));
}