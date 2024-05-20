import { AdminAuthRequest } from "@/app/model/AdminAuthRequest";
import { ApiResponse } from "@/app/model/ApiResponse";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createExpiryTime, createHash, createToken } from "../route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    let reqData: AdminAuthRequest = await req.json();
    let token = createToken(reqData.userName);

    try {
        let userName = reqData.userName;
        let password = reqData.password;
        const authData = await prisma.adminAuth.findUnique({
            where: {
                userName: createHash(userName)
            },
        });

        if (!authData) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        let hashedPassword = createHash(password)
        if (hashedPassword == authData.password) {
            let apiResponse = new ApiResponse();
            apiResponse.status = "OK";
            let newToken = createToken(userName)
            authData.token = token?.toString();
            console.log(reqData.userName?.toString())
            let updatedData = await prisma.adminAuth.update({
                where: { userName: createHash(userName) }, data: {
                    userName: authData.userName,
                    password: authData.password,
                    token: token,
                    expires: createExpiryTime()
                }
            });
            apiResponse.data = { validUser: true, token: token };
            return NextResponse.json(apiResponse);
        } else {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    } catch (error: any) {
        let errResponse = new ApiResponse();
        errResponse.status = "INTERNAL_SERVER_ERROR";
        errResponse.errorMessage = error?.message;
        errResponse.data = null;
        return new NextResponse(JSON.stringify(errResponse), { status: 500 });
    }
}