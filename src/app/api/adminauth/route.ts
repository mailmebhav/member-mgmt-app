import { AdminAuthPutRequest } from "@/app/model/AdminAuthPutRequest";
import { AdminAuthRequest } from "@/app/model/AdminAuthRequest";
import { ApiResponse } from "@/app/model/ApiResponse";
import { createApiResponseObject, internalServerErrorResponse } from "@/utils/responseHandlers";
import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../lib/prisma";
import { createExpiryTime, createHash, createToken } from '../../../utils/hashutil';
import { insertAuditTrailTransaction } from "@/utils/auditTrailUtil";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  const adminAuths = await prisma.adminAuth.findMany();

  try {
    insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

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

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", authData), { status: 201 });
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
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
      return internalServerErrorResponse("Old Password is not correct");
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

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", authData));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }


}

export async function DELETE(req: NextRequest) {
  // Handle DELETE request logic
  let reqData: AdminAuthRequest = await req.json();

  try {
    let fetchedData = await prisma.adminAuth.findUnique({
      where: {
        userName: createHash(reqData.userName).toString()
      }
    });

    if (fetchedData?.password != createHash(reqData.password)) {
      return internalServerErrorResponse("Password is not correct");
    }

    const authData = await prisma.adminAuth.delete({
      where: { userName: fetchedData.userName }
    });

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }
    
    let response = reqData.userName + " deleted successfully";
    return NextResponse.json(createApiResponseObject("OK", "", response));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}
