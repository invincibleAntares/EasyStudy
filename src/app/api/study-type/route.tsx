import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {courseId,studyType} = await req.json();

    if(studyType=='ALL')
    {
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));

        // Get all the other Study Types Records
 
     const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
     .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId));

        const result = {
            notes : notes.length > 0 ? notes : contentList?.filter(item=>item.type=='Notes'),
            flashcard: contentList?.filter(item=>item.type=='Flashcard'),
            quiz:  contentList?.filter(item=>item.type=='Quiz'),
            qa: contentList?.filter(item=>item.type=='QA'),
        }
       return NextResponse.json(result);

    }
   else if(studyType=='notes' || studyType=='Notes')
   {
    // For backward compatibility, check both CHAPTER_NOTES_TABLE and STUDY_TYPE_CONTENT_TABLE
    let notes = await db.select().from(CHAPTER_NOTES_TABLE)
    .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));
    
    // If no notes in CHAPTER_NOTES_TABLE, check STUDY_TYPE_CONTENT_TABLE
    if (!notes || notes.length === 0) {
      const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(
            and(
                eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
                eq(STUDY_TYPE_CONTENT_TABLE?.type, 'Notes')
            )
        );
      return NextResponse.json(result[0]);
    }
 
    return NextResponse.json(notes);
   }

   else {
    const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(
            and(
                eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
                eq(STUDY_TYPE_CONTENT_TABLE?.type, studyType)
            )
        );

    return NextResponse.json(result[0]);
}


}