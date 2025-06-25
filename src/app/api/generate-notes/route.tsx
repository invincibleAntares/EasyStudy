import { generateNotesAiModel } from "@/configs/Aimodel";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { courseId, chapterId, prompt } = await req.json();

        if (!courseId || chapterId === undefined || !prompt) {
            return NextResponse.json(
                { error: 'courseId, chapterId, and prompt are required' },
                { status: 400 }
            );
        }

        // Generate notes for the specific chapter
        const result = await generateNotesAiModel.sendMessage(prompt);
        const aiResp = result.response.text();

        // Save to database
        await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: chapterId,
            courseId: courseId,
            notes: aiResp
        });

        return NextResponse.json({ success: true, chapterId });
    } catch (error) {
        console.error('Error generating notes:', error);
        return NextResponse.json(
            { error: 'Failed to generate notes' },
            { status: 500 }
        );
    }
} 