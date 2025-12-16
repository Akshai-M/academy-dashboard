// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();

//     const newCandidate = await prisma.candidate_interviews.create({
//       data: {
//         user_id: data.user_id,
//         candidate_name: data.candidate_name,
//         mobile_number: data.mobile_number,
//         candidate_email: data.candidate_email,
//         candidate_resume_link: data.candidate_resume_link,
//         placement_status: data.placement_status,
//         frontend_interview_date: data.frontend_interview_date
//           ? new Date(data.frontend_interview_date)
//           : null,
//         frontend_time_slot: data.frontend_time_slot,
//         backend_interview_date: data.backend_interview_date
//           ? new Date(data.backend_interview_date)
//           : null,
//         backend_time_slot: data.backend_time_slot,
//         interview_status: data.interview_status,
//       },
//     });

//     return NextResponse.json(newCandidate, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.PHONE_SECRET_KEY as string;

// ensure key becomes 32-byte SHA256 hash
function getValidKey(key: string) {
  return crypto.createHash("sha256")
    .update(key)
    .digest();
}

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const key = getValidKey(SECRET_KEY);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

function hashMobile(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const encryptedMobile = encrypt(data.mobile_number);
    const hashedMobile = hashMobile(data.mobile_number);
    console.log("Hashed Mobile:", hashedMobile);
    const newCandidate = await prisma.candidate_interviews.create({
      data: {
        user_id: data.user_id,
        candidate_name: data.candidate_name,
        mobile_number: encryptedMobile,
        mobile_hash: hashedMobile,
        candidate_email: data.candidate_email,
        candidate_resume_link: data.candidate_resume_link,
        placement_status: data.placement_status,
        frontend_interview_date: data.frontend_interview_date
          ? new Date(data.frontend_interview_date)
          : null,
        frontend_time_slot: data.frontend_time_slot,
        backend_interview_date: data.backend_interview_date
          ? new Date(data.backend_interview_date)
          : null,
        backend_time_slot: data.backend_time_slot,
        interview_status: data.interview_status,
      },
    });

    return NextResponse.json(newCandidate, { status: 201 });
  } catch (error) {
    console.error("Encryption/Prisma Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
