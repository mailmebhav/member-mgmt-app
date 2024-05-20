import * as crypto from "crypto";

const hashFunction = "sha256";
const cipherAlgorithm = "aes-256-cbc";
const key_cyph = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export function createToken(userName: String): string {
    const cipher = crypto.createCipheriv(cipherAlgorithm, key_cyph, iv);
    let token = cipher.update(userName + new Date().toISOString(), "utf8", "hex");
    token += cipher.final("hex");
    return token;
  }
  
  export function createExpiryTime(): Date {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours in milliseconds
    return futureTime;
  }
  
  export function createHash(value: String): string {
    return crypto
      .createHash(hashFunction)
      .update(value?.toString())
      .digest("hex")
      .toString();
  }