import { ApiResponse } from "@/app/model/ApiResponse";
import { PaymentType } from "@/app/model/PaymentType";
import { createApiResponseObject, internalServerErrorResponse, unauthorizedResponse } from "@/utils/responseHandlers";
import { validateToken } from "@/utils/validationUtil";
import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../lib/prisma";
import { insertAuditTrailTransaction } from "@/utils/auditTrailUtil";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  const firms = await prisma.paymentType.findMany();
  let apiResponse = new ApiResponse();
  apiResponse.status = "OK";
  apiResponse.data = firms;

  try {
    insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

  return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
  // Handle POST request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: PaymentType = await req.json();
  try {
    const paymentTypeData = await prisma.paymentType.create({
      data: {
        paymentFor: reqData.paymentFor?.toString(),
      }
    });

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", paymentTypeData), { status: 201 });
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}

export async function PUT(req: NextRequest) {
  // Handle PUT request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: PaymentType = await req.json();
  try {
    let updatedPaymentTypeData = await prisma.paymentType.update({
      where: {
        paymentTypeId: reqData.paymentTypeId
      }, data: {
        paymentFor: reqData.paymentFor?.toString(),
      }
    });

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", updatedPaymentTypeData));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}

export async function DELETE(req: NextRequest) {
  // Handle DELETE request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: PaymentType = await req.json();
  try {
    let deleteData = await prisma.paymentType.delete({
      where: {
        paymentTypeId: reqData.paymentTypeId
      }
    });

    try {
      insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", "Payment ID: " + reqData.paymentTypeId + " Deleted successfully"));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}