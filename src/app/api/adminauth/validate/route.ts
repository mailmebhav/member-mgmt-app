import { AdminAuthRequest } from "@/app/model/AdminAuthRequest";
import { ApiResponse } from "@/app/model/ApiResponse";
import { internalServerErrorResponse, unauthorizedResponse } from "@/utils/responseHandlers";
import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../../lib/prisma";
import { createExpiryTime, createHash, createToken } from '../../../../utils/hashutil';

const prisma = prismaClientSingleton();

export async function POST(req: NextRequest) {
  let reqData: AdminAuthRequest = await req.json();
  let token = createToken(reqData.userName);

  try {
    let userName = reqData.userName;
    let password = reqData.password;
    const authData = await prisma.adminAuth.findUnique({
      where: {
        userName: createHash(userName),
      },
    });

    if (!authData) {
      return unauthorizedResponse();
    }
    let hashedPassword = createHash(password);
    if (hashedPassword == authData.password) {
      let apiResponse = new ApiResponse();
      apiResponse.status = "OK";
      let newToken = createToken(userName);
      authData.token = token?.toString();
      console.log(reqData.userName?.toString());
      let updatedData = await prisma.adminAuth.update({
        where: { userName: createHash(userName) },
        data: {
          userName: authData.userName,
          password: authData.password,
          token: token,
          expires: createExpiryTime(),
        },
      });
      apiResponse.data = { validUser: true, token: token };
      return NextResponse.json(apiResponse);
    } else {
      return unauthorizedResponse();
    }
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}
