import { NextRequest } from "next/server";
import { prismaClientSingleton } from "../../lib/prisma";

const prisma = prismaClientSingleton();

export async function insertAuditTrailTransaction(reqMethod: string, requestUrl: string, payload: string) {
    try {
        const auditTrail = await prisma.auditTrail.create({
            data: {
                requestType: reqMethod,
                requestUrl: requestUrl,
                payload: payload,
                transactionTime: new Date()
            }
        });

    } catch (error) {
        console.log(error);
    }
}