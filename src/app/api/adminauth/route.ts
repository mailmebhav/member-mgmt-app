import { AdminAuthRequest } from '@/app/model/AdminAuthRequest';
import { ApiResponse } from '@/app/model/ApiResponse';
import { PrismaClient } from '@prisma/client';
import * as crypto from "crypto";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const hashFunction = "sha256";
export const cipherAlgorithm = 'aes-256-cbc';
export const key = crypto.randomBytes(32);
export const iv = crypto.randomBytes(16);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
                expires: expires
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

export function createToken(userName: String): string {
    const cipher = crypto.createCipheriv(cipherAlgorithm, key, iv);
    let token = cipher.update(userName + new Date().toISOString(), 'utf8', 'hex');
    token += cipher.final('hex');
    return token;
}

export function createExpiryTime(): Date {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours in milliseconds
    return futureTime;

}

export function createHash(value: String): string {
    return crypto.createHash(hashFunction).update(value?.toString()).digest('hex').toString();
}

