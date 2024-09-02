import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../../lib/prisma";
import { createApiResponseObject, unauthorizedResponse } from "@/utils/responseHandlers";
import { validateToken } from "@/utils/validationUtil";
import { getAge } from "@/utils/dateutils";
import { getAggregateByAgeAndGender } from "@/utils/stats";


const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  const datesCount = await prisma.member.findMany({
    select: {
      memberId: true,
      dob: true,
      gender: true,
      },
  });
  let datesCountNewList: any = []
  datesCount && datesCount.forEach(element => {     
      datesCountNewList.push({
        id: element.memberId,
        ageInYrs: getAge(element.dob),
        gender: element.gender
      })
  });
  const aggregateResponse = getAggregateByAgeAndGender(datesCountNewList)
   return NextResponse.json(createApiResponseObject("OK", "", aggregateResponse));
}