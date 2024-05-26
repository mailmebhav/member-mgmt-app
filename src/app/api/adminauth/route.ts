import { AdminAuthPutRequest } from "@/app/model/AdminAuthPutRequest";
import { AdminAuthRequest } from "@/app/model/AdminAuthRequest";
import { ApiResponse } from "@/app/model/ApiResponse";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createExpiryTime, createHash, createToken } from '../../../utils/hashutil';

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
    return NextResponse.json(apiResponse, { status: 201 });
  } catch (error: any) {
    let errResponse = new ApiResponse();
    errResponse.status = "INTERNAL_SERVER_ERROR";
    errResponse.errorMessage = error?.message;
    errResponse.data = null;
    return new NextResponse(JSON.stringify(errResponse), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Handle PUT request logic
  let reqData: AdminAuthPutRequest = await req.json();
  let token = createToken(reqData.userName);
  let expires = createExpiryTime();
  try {
    let fetchedData = await prisma.adminAuth.findUnique({
      where: {
        userName: createHash(reqData.userName).toString()
      }
    });

    if (fetchedData?.password != createHash(reqData.oldPassword)) {
      let errResponse = new ApiResponse();
      errResponse.status = "INTERNAL_SERVER_ERROR";
      errResponse.errorMessage = "Old Password is not correct";
      errResponse.data = null;
      return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }

    const authData = await prisma.adminAuth.update({
      where: { userName: fetchedData.userName },
      data: {
        userName: fetchedData.userName,
        password: createHash(reqData.newPassword),
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

export async function DELETE(req: NextRequest) {
  // Handle PUT request logic
  let reqData: AdminAuthRequest = await req.json();

  try {
    let fetchedData = await prisma.adminAuth.findUnique({
      where: {
        userName: createHash(reqData.userName).toString()
      }
    });

    if (fetchedData?.password != createHash(reqData.password)) {
      let errResponse = new ApiResponse();
      errResponse.status = "INTERNAL_SERVER_ERROR";
      errResponse.errorMessage = "Password is not correct";
      errResponse.data = null;
      return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }

    const authData = await prisma.adminAuth.delete({
      where: { userName: fetchedData.userName }
    });
    let apiResponse = new ApiResponse();
    apiResponse.status = "OK";
    apiResponse.data = reqData.userName + " deleted successfully";
    return NextResponse.json(apiResponse);
  } catch (error: any) {
    let errResponse = new ApiResponse();
    errResponse.status = "INTERNAL_SERVER_ERROR";
    errResponse.errorMessage = error?.message;
    errResponse.data = null;
    return new NextResponse(JSON.stringify(errResponse), { status: 500 });
  }
}
