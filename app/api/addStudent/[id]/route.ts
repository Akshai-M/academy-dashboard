import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await req.json();

  const existing = await prisma.candidate_interviews.findUnique({
    where: { user_id: id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  function encrypt(text: string) {
    const crypto = require("crypto");
    const iv = crypto.randomBytes(16);
    const SECRET_KEY = process.env.PHONE_SECRET_KEY as string;
    const key = crypto.createHash("sha256").update(SECRET_KEY).digest();

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
  }
  if (data.mobile_number) {
    data.mobile_number = encrypt(data.mobile_number);
  } 

  if (data.strongest_skill) {
    const incomingSkills = data.strongest_skill
      .split(",")
      .map((s: string) => s.trim().toLowerCase())
      .filter(Boolean);

    const existingSkills = existing.strongest_skill
      ? existing.strongest_skill
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
      : [];

    const mergedSkills = Array.from(new Set([...existingSkills, ...incomingSkills]));

    data.strongest_skill = mergedSkills
      .map(
        (s) => s.charAt(0).toUpperCase() + s.slice(1) 
      )
      .join(", ");
  }

  const updated = await prisma.candidate_interviews.update({
    where: { user_id: id },
    data,
  });

  return NextResponse.json(updated);
}
