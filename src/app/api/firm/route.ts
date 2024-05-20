import { ApiResponse } from "@/app/model/ApiResponse";
import { Firm } from "@/app/model/Firm";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Handle GET request logic
    const firms = await prisma.firm.findMany();
    let apiResponse = new ApiResponse();
    apiResponse.status = "OK";
    apiResponse.data = firms;
    return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
    // Handle POST request logic
    let reqData: Firm = await req.json();
    try {
        const firmData = await prisma.firm.create({
            data: {
                firmName: reqData.firmName.toString(),
                area: reqData.area.toString(),
                pincode: reqData.pincode
            },
        });
        let apiResponse = new ApiResponse();
        apiResponse.status = "OK";
        apiResponse.data = firmData;
        return NextResponse.json(apiResponse, {status: 201});
    } catch (error: any) {
        let errResponse = new ApiResponse();
        errResponse.status = "INTERNAL_SERVER_ERROR";
        errResponse.errorMessage = error?.message;
        errResponse.data = null;
        return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }
}