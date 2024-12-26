
import { courseOutlineAiModel } from "@/configs/Aimodel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

        if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }
       
        const PROMPT = `Generate a study material for ${courseType} for ${topic} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter, All result in JSON format`;
      
        const aiResp = await courseOutlineAiModel.sendMessage(PROMPT);
        const aiResult = JSON.parse(aiResp.response.text());

        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId,
            courseType,
            createdBy,
            topic,
            courseLayout: aiResult,
        }).returning({resp:STUDY_MATERIAL_TABLE});

        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
