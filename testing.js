import crypto from "crypto";

const SECRET_KEY = "12345678901234567890123456789012"; // or your .env key

function getValidKey(key) {
  return crypto.createHash("sha256").update(key).digest();
}

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const key = getValidKey(SECRET_KEY);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const key = getValidKey(SECRET_KEY);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}


export function hashMobile(mobile) {
  return crypto
    .createHash("sha256")
    .update(mobile, "utf8")
    .digest("hex");
}

// TEST
const mobile = "9392377148";
console.log("Hashed Mobile:", hashMobile(mobile));

// TEST
// const mobile = "9392889607";

// const encrypted = encrypt(mobile);
// const decrypted = decrypt("e07cdfa2505b6cb5db6d1049233538d4:6bb554719337c93c997cb2c546c60ef6");

// console.log("Original:", mobile);
// console.log("Encrypted:", encrypted);
// console.log("Decrypted:", decrypted);
