import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { createdBy } = await req.json();
    if (!createdBy) {
      return NextResponse.json({ error: "createdBy is required" }, { status: 400 });
    }
    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id))

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error fetching study materials:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
