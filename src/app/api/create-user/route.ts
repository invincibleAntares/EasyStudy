import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { user } = await req.json();
    if (!user) {
      return NextResponse.json({ error: "user is required" }, { status: 400 });
    }

    // Check if user exists and create new if not in DB
    const existingUser = await db.select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || ''));
    
    if (!existingUser[0]) {
      await db.insert(USER_TABLE)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        }).returning({id: USER_TABLE.id});
    }

    return NextResponse.json({ result: "Success" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}