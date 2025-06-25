import { courseOutlineAiModel, generateNotesAiModel } from "@/configs/Aimodel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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
        });

        // Generate Notes for Each Chapter with AI in parallel for better performance
        const chapters = aiResult?.chapters;
        if (chapters) {
            const notesPromises = chapters.map(async (chapter: any, index: number) => {
                const NOTES_PROMPT = 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters:' + JSON.stringify(chapter);
                const result = await generateNotesAiModel.sendMessage(NOTES_PROMPT);
                const aiResp = result.response.text();

                return db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId: index,
                    courseId: courseId,
                    notes: aiResp
                });
            });

            // Execute all chapter note generation in parallel
            await Promise.all(notesPromises);
        }

        // Update status to 'Ready'
        await db.update(STUDY_MATERIAL_TABLE).set({
            status: 'Ready'
        }).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

        return NextResponse.json({ result: { courseId, status: 'Ready' } });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
