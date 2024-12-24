
import { USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";


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
  
)