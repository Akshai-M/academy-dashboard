import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const {id} = await context.params;
  const data = await req.json();

  const updated = await prisma.candidate_interviews.update({
    where: { user_id: id },
    data,
  });

  return NextResponse.json(updated);
}
