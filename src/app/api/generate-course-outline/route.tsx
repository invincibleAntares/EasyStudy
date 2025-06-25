import { courseOutlineAiModel } from "@/configs/Aimodel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

        if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }
       
        const PROMPT = `Generate a study material for a course titled "${courseType}" focused on the topic "${topic}" at a "${difficultyLevel}" level of difficulty.  

        The output should include:
        1. a good title of course based on the input topic but good version one int 4 to 5 words  
        2. A detailed course summary not too long, not include chapter name just the summry
        3. A structured list of chapters, each with a brief summary highlighting its focus and purpose nad not loo long and not include things like this chapter focus on 
        just the short and good summry.  
        4. A detailed list of topics covered in each chapter to give a clear roadmap of the course contents.  
        5. Emoji icon for each Chapter
        Provide all results in JSON format, ensuring the structure is clear, well-organized, and learner-friendly.`;
        
        const aiResp = await courseOutlineAiModel.sendMessage(PROMPT);
        const aiResult = JSON.parse(aiResp.response.text());

        await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId,
            courseType,
            createdBy,
            topic,
            courseLayout: aiResult,
            status: 'Ready' // Set to ready immediately since we're not generating notes here anymore
        });

        return NextResponse.json({ result: { courseId, status: 'Ready' } });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
