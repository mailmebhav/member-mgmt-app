import { ApiResponse } from "@/app/model/ApiResponse";
import { Member } from "@/app/model/Member";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Handle GET request logic
    const firms = await prisma.member.findMany();
    let apiResponse = new ApiResponse();
    apiResponse.status = "OK";
    apiResponse.data = firms;
    return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
    // Handle POST request logic
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
                kutchNative: reqData.kutchNative?.toString()
            },
        });
        let apiResponse = new ApiResponse();
        apiResponse.status = "OK";
        apiResponse.data = memberData;
        return NextResponse.json(apiResponse, {status: 201});
    } catch (error: any) {
        let errResponse = new ApiResponse();
        errResponse.status = "INTERNAL_SERVER_ERROR";
        errResponse.errorMessage = error?.message;
        errResponse.data = null;
        return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }
}