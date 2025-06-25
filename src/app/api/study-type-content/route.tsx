import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { GenerateQuizAiModel, GenerateStudyTypeContentAiModel, GenerateQAAiModel } from "@/configs/Aimodel";
import { eq } from "drizzle-orm";

export async function POST(req: Request){
    const {chapters,courseId,type} = await req.json();

    const PROMPT = type=='Flashcard'?
        "Generate the flashcard on topic:"+chapters + "  in JSON format with front back content, Maximum 15"
        : type=='Quiz'?
        "Generate the Quiz on topic:"+chapters + "  in JSON format with question and answer, Maximum 15"
        : type=='Notes'?
        "Generate comprehensive study notes for the topic:"+chapters + ". Create detailed notes in JSON format with chapters array, each containing chapterTitle, chapterSummary, topics array, and detailed content in HTML format (no HTML, head, body tags). Make it comprehensive for exam preparation."
        :
        "Generate comprehensive Question and Answer pairs on topic:"+chapters + "  in JSON format with detailed questions and comprehensive answers that help in exam preparation and interview practice, Maximum 15";
     // Insert Record to DB, Update status to Generating...

     const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
       type: type
     }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id});

     // Generate content using AI (previously done by Inngest)
     const aiResult = type == 'Flashcard'?
       await GenerateStudyTypeContentAiModel.sendMessage(PROMPT)
       : type == 'Quiz'?
       await GenerateQuizAiModel.sendMessage(PROMPT)
       : type == 'Notes'?
       await GenerateQuizAiModel.sendMessage(PROMPT)
       :
       await GenerateQAAiModel.sendMessage(PROMPT);
     const AIResult = JSON.parse(aiResult.response.text());

     // Save the result to DB
     await db.update(STUDY_TYPE_CONTENT_TABLE)
       .set({
         content: AIResult,
         status:'Ready'
       }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, result[0].id));

     return NextResponse.json(result[0].id)
}