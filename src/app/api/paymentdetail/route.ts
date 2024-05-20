import { ApiResponse } from "@/app/model/ApiResponse";
import { PaymentDetail } from "@/app/model/PaymentDetail";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Handle GET request logic
    const firms = await prisma.paymentDetail.findMany();
    let apiResponse = new ApiResponse();
    apiResponse.status = "OK";
    apiResponse.data = firms;
    return NextResponse.json(apiResponse);
}

export async function POST(req: NextRequest) {
    // Handle POST request logic
    let reqData: PaymentDetail = await req.json();
    try {
        const paymentData = await prisma.paymentDetail.create({
            data: {
                paymentMode: reqData.paymentMode?.toString(),
                paymentFor: reqData.paymentFor?.toString(),
                amount: reqData.amount,
                transactionId: reqData.transactionId?.toString(),
                receiptNumber: reqData.receiptNumber?.toString()
            },
        });
        let apiResponse = new ApiResponse();
        apiResponse.status = "OK";
        apiResponse.data = paymentData;
        return NextResponse.json(apiResponse, {status: 201});
    } catch (error: any) {
        let errResponse = new ApiResponse();
        errResponse.status = "INTERNAL_SERVER_ERROR";
        errResponse.errorMessage = error?.message;
        errResponse.data = null;
        return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }
}

export async function PUT(params:type) {
    
}