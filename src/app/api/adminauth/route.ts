import { AdminAuthRequest } from "@/app/model/AdminAuthRequest";
import { ApiResponse } from "@/app/model/ApiResponse";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { createToken, createExpiryTime, createHash } from '../../../utils/hashutil'

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  const adminAuths = await prisma.adminAuth.findMany();
  let apiResponse = new ApiResponse();
  apiResponse.status = "OK";
  apiResponse.data = adminAuths;
  return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
  // Handle POST request logic
  let reqData: AdminAuthRequest = await req.json();
  let token = createToken(reqData.userName);
  let expires = createExpiryTime();
  try {
    const authData = await prisma.adminAuth.create({
      data: {
        userName: createHash(reqData.userName),
        password: createHash(reqData.password),
        token: token,
        expires: expires,
      },
    });
    let apiResponse = new ApiResponse();
    apiResponse.status = "OK";
    apiResponse.data = authData;
    return NextResponse.json(apiResponse);
  } catch (error: any) {
    let errResponse = new ApiResponse();
    errResponse.status = "INTERNAL_SERVER_ERROR";
    errResponse.errorMessage = error?.message;
    errResponse.data = null;
    return new NextResponse(JSON.stringify(errResponse), { status: 500 });
  }
}


