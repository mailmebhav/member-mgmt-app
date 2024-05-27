import { Member } from "@/app/model/Member";
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

  const firms = await prisma.member.findMany({ include: { firm: true } });
  return NextResponse.json(createApiResponseObject("OK", "", firms));
}

export async function POST(req: NextRequest) {
  // Handle POST request logic
  let authToken = req.headers.get("Authorization");
  let validUser = await validateToken(authToken);
  if (!validUser) {
    return unauthorizedResponse();
  }

  let reqData: Member = await req.json();
  try {
    const memberData = await prisma.member.create({
      data: {
        firmId: reqData.firmId,
        ksmnId: reqData.ksmnId?.toString(),
        yskId: reqData.yskId?.toString(),
        familyId: reqData.familyId?.toString(),
        memberName: reqData.memberName?.toString(),
        fatherName: reqData.fatherName?.toString(),
        nokh: reqData.nokh.toString(),
        dob: new Date(reqData.dob),
        gender: reqData.gender?.toString(),
        bloodGroup: reqData.bloodGroup?.toString(),
        contact: reqData.contact?.toString(),
        contact2: reqData.contact2?.toString(),
        kutchNative: reqData.kutchNative?.toString(),
      }, include: { firm: true },
    });
    return NextResponse.json(createApiResponseObject("OK", "", memberData), { status: 201 });
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

  let reqData: Member = await req.json();
  try {
    let updatedMemberData = await prisma.member.update({
      where: {
        memberId: reqData.memberId
      }, data: {
        firmId: reqData.firmId,
        ksmnId: reqData.ksmnId?.toString(),
        yskId: reqData.yskId?.toString(),
        familyId: reqData.familyId?.toString(),
        memberName: reqData.memberName?.toString(),
        fatherName: reqData.fatherName?.toString(),
        nokh: reqData.nokh.toString(),
        dob: new Date(reqData.dob),
        gender: reqData.gender?.toString(),
        bloodGroup: reqData.bloodGroup?.toString(),
        contact: reqData.contact?.toString(),
        contact2: reqData.contact2?.toString(),
        kutchNative: reqData.kutchNative?.toString(),
      }, include: { firm: true }
    });

    return NextResponse.json(createApiResponseObject("OK", "", updatedMemberData));
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

  let reqData: Member = await req.json();
  let deleteData = await prisma.member.delete({
    where: {
      memberId: reqData.memberId
    }
  });

  let response = " Member ID: " + reqData.memberId + " Member Name: " + reqData.memberName + " Deleted successfully";
  return NextResponse.json(createApiResponseObject("OK", "", response));
}