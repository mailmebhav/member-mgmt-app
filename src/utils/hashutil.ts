import { TokenDetails } from "@/app/model/TokenDetails";
import * as crypto from "crypto";

const hashFunction = "sha256";
const cipherAlgorithm = "aes-256-cbc";
const key_cyph = Buffer.from('4c8fe5ac0d2e6b6b0d8e1a9c3e4f5b7d9c0a1b2c3d4e5f6b7d8c9e0a1b2c3d4e', 'hex');
const iv = Buffer.from('1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', 'hex');

export function createToken(userName: String): string {
  const cipher = crypto.createCipheriv(cipherAlgorithm, key_cyph, iv);
  let token = cipher.update(userName + ";" + Date.now(), "utf8", "hex");
  token += cipher.final("hex");
  return token;
}

export function createExpiryTime(): Date {
  const currentTime = Date.now();
  const futureTime = new Date(currentTime + (4 * 60 * 60 * 1000)); // Add 4 hours in milliseconds
  return new Date(futureTime);
}

export function createHash(value: String): string {
  return crypto
    .createHash(hashFunction)
    .update(value?.toString())
    .digest("hex")
    .toString();
}

export function decryptToken(token: String): TokenDetails {
  let tokenDetails = new TokenDetails();
  tokenDetails.token = token.toString();

  const decipher = crypto.createDecipheriv(cipherAlgorithm, key_cyph, iv);
  let decrypted = decipher.update(token.toString(), "hex", "utf8");
  decrypted += decipher.final("utf8");
  let decryptedString = decrypted.toString()
  let decryptedArr = decryptedString.split(";");
  let userName = decryptedArr[0];
  let expires:number = parseInt(decryptedArr[1]);
  expires += (4 * 60 * 60 * 1000) // Add 4 hours in milliseconds
  let expiryTime = new Date(expires);
  tokenDetails.userName = userName;
  tokenDetails.expires = expiryTime;
  return tokenDetails;
}
