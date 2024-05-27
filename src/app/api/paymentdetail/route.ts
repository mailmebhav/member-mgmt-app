import { ApiResponse } from "@/app/model/ApiResponse";
import { PaymentDetail } from "@/app/model/PaymentDetail";
import { createApiResponseObject, internalServerErrorResponse, unauthorizedResponse } from "@/utils/responseHandlers";
import { validateToken } from "@/utils/validationUtil";
import { NextRequest, NextResponse } from "next/server";
import { prismaClientSingleton } from "../../../../lib/prisma";

const prisma = prismaClientSingleton();

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  const firms = await prisma.paymentDetail.findMany({ include: { member: true } });
  let apiResponse = new ApiResponse();
  apiResponse.status = "OK";
  apiResponse.data = firms;
  return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
  // Handle POST request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: PaymentDetail = await req.json();
  try {
    const paymentData = await prisma.paymentDetail.create({
      data: {
        paymentMode: reqData.paymentMode?.toString(),
        paymentFor: reqData.paymentFor?.toString(),
        amount: reqData.amount,
        transactionId: reqData.transactionId?.toString(),
        receiptNumber: reqData.receiptNumber?.toString(),
        memberId: reqData.memberId
      }, include: { member: true }
    });
    return NextResponse.json(createApiResponseObject("OK", "", paymentData), { status: 201 });
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

  let reqData: PaymentDetail = await req.json();
  try {
    let updatedPaymentData = await prisma.paymentDetail.update({
      where: {
        paymentId: reqData.paymentId
      }, data: {
        paymentMode: reqData.paymentMode?.toString(),
        paymentFor: reqData.paymentFor?.toString(),
        amount: reqData.amount,
        transactionId: reqData.transactionId?.toString(),
        receiptNumber: reqData.receiptNumber?.toString(),
        memberId: reqData.memberId
      }, include: { member: true }
    });

    return NextResponse.json(createApiResponseObject("OK", "", updatedPaymentData));
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

  let reqData: PaymentDetail = await req.json();
  try {
    let deleteData = await prisma.paymentDetail.delete({
      where: {
        paymentId: reqData.paymentId
      }
    });

    return NextResponse.json(createApiResponseObject("OK", "", "Payment ID: " + reqData.paymentId + " Deleted successfully"));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}