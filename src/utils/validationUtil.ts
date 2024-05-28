import { prismaClientSingleton } from "../../lib/prisma";
import { createHash, decryptToken } from "./hashutil";

const prisma = prismaClientSingleton();

export async function validateToken(token: string | null): Promise<boolean> {
    try {
        if(token == null || token.length == 0 || token == "") {
            return false;
        }

        let data = decryptToken(token);
        let userData = await prisma.adminAuth.findUnique({
            where: {
                userName: createHash(data.userName)
            }
        });

        if (userData == null) {
            return false;
        }

        if (userData != null && userData.token == data.token) {
            if (new Date() < data.expires) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (error: any) {
        return false;
    }
}