
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "@/configs/Aimodel";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
  {id : 'create-user'},
  {event: 'user.create'},
  async ({event,step}) => {
    const {user} = event.data;
    const result = await step.run('check User and create New if Not in Db',async()=>{
         const result = await db.select()
                    .from(USER_TABLE)
                    .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress! ));
                
                if (!result[0]) {
                 const userResp =    await db.insert(USER_TABLE)
                        .values({
                         name: user?.fullName,
                         email: user?.primaryEmailAddress?.emailAddress,
                        
                        }).returning({id: USER_TABLE.id});
                        return userResp;
                }
             return result[0];  
    })
    return 'Success';
  }
  // step to Send welcome Email notification


  // after 3 days
);


export const GenerateNotes = inngest.createFunction(
  {
    id: 'generate-course'},
    {event: 'notes.generate'},

  async ({event, step}) => {
    const { course } = event.data;
      // Generate Notes for Each Chapter with AI
   const notesResult = await step.run('Generate Notes for Each Chapter with AI', async()=>{ 
     const Chapters = course?.courseLayout?.chapters;
     let index = 0;
     Chapters.forEach(async(chapter)=>{
      const PROMPT = 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters:' + JSON.stringify(chapter);
      const result = await generateNotesAiModel.sendMessage(PROMPT);
      const aiResp = result.response.text();

      await db.insert(CHAPTER_NOTES_TABLE).values({
        chapterId: index,
        courseId: course?.courseId,
        notes: aiResp
      })
      index++;
    })
    return 'Completed';
   })
   
    
         // update status to 'Ready'

         const updateCourseStatus = await step.run('Update Course Status to Ready', async()=>{
             
           const result = await db.update(STUDY_MATERIAL_TABLE).set({
            status: 'Ready'
           }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))

           return 'Success';
         });

  }
);
