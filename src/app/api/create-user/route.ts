import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user } = await req.json();
    if (!user) {
      return NextResponse.json({ error: "user is required" }, { status: 400 });
    }

    const result = await inngest.send({
      name: 'user.create',
      data: {
        user: user
      }
    });

    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}