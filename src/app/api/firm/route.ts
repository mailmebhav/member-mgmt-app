import { Firm } from "@/app/model/Firm";
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

  const firms = await prisma.firm.findMany({
    where: {
      activeFirm: true
    }
  });

  try {
    await insertAuditTrailTransaction(req.method, req.url, "");
  } catch (error) {
    console.log("Error while inserting audit trail");
    console.log(error);
  }

  return NextResponse.json(createApiResponseObject("OK", "", firms));
}

export async function POST(req: NextRequest) {
  // Handle POST request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: Firm = await req.json();
  try {
    const firmData = await prisma.firm.create({
      data: {
        firmName: reqData.firmName.toString(),
        area: reqData.area.toString(),
        pincode: reqData.pincode,
        firmType: reqData.firmType != null ? reqData.firmType.toString() : "Primary",
        activeFirm: reqData.activeFirm != null ? reqData.activeFirm : true
      },
    });

    try {
      await insertAuditTrailTransaction(req.method, req.url, JSON.stringify(reqData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", firmData), { status: 201 });
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}

export async function PUT(req: NextRequest) {
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let firmData: Firm = await req.json();
  try {
    let updatedFirmData = await prisma.firm.update({
      where: {
        firmId: firmData.firmId
      }, data: {
        firmId: firmData.firmId,
        firmName: firmData.firmName.toString(),
        area: firmData.area.toString(),
        pincode: firmData.pincode,
        firmType: firmData.firmType != null ? firmData.firmType.toString() : "Primary",
        activeFirm: firmData.activeFirm != null ? firmData.activeFirm : true
      }
    });

    try {
      await insertAuditTrailTransaction(req.method, req.url, JSON.stringify(firmData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    return NextResponse.json(createApiResponseObject("OK", "", updatedFirmData));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}

export async function DELETE(req: NextRequest) {
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let firmData: Firm = await req.json();
  try {
    let updatedFirmData = await prisma.firm.delete({
      where: {
        firmId: firmData.firmId
      }
    });

    try {
      await insertAuditTrailTransaction(req.method, req.url, JSON.stringify(firmData));
    } catch (error) {
      console.log("Error while inserting audit trail");
      console.log(error);
    }

    let response = " Firm ID: " + firmData.firmId + " Firm Name: " + firmData.firmName + " Deleted successfully";
    return NextResponse.json(createApiResponseObject("OK", "", response));
  } catch (error: any) {
    return internalServerErrorResponse(error?.message);
  }
}