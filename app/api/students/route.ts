import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashMobile(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}


export async function POST(request: NextRequest) {
  try {
    const { mobile, isAdmin } = await request.json();

    if (!mobile) {
      return NextResponse.json(
        { message: "Mobile is required" },
        { status: 400 }
      );
    }

    if (isAdmin) {
      const res = NextResponse.json({ admin: true }, { status: 200 });
      res.cookies.set("session", mobile, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      return res;
    }

    const mobileHash = hashMobile(mobile);

    const student = await prisma.candidate_interviews.findFirst({
      where: { mobile_hash: mobileHash },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const decryptedStudent = {
      ...student,
      mobile_number: decrypt(student.mobile_number),
    };

    const res = NextResponse.json(decryptedStudent, { status: 200 });

    res.cookies.set("session", mobile, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

const SECRET_KEY = process.env.PHONE_SECRET_KEY as string;

function getValidKey(key: string) {
  return crypto.createHash("sha256").update(key).digest();
}

function decrypt(encryptedText: string) {
  const [ivHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const key = getValidKey(SECRET_KEY);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export async function GET() {
  try {
    const adminData = await prisma.candidate_interviews.findMany();

    const decryptedData = adminData.map(item => ({
      ...item,
      mobile_number: decrypt(item.mobile_number),
    }));

    return NextResponse.json(decryptedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server error ${error}` }, { status: 500 });
  }
}

