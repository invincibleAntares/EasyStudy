"use client"
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import React, { ReactNode, useEffect } from 'react';
import { eq } from 'drizzle-orm';
import { USER_TABLE } from '@/configs/schema';
import axios from 'axios';

function Provider({ children }: { children: ReactNode }) {
    const { user } = useUser();
  useEffect(()=>{
         user && isNewUser();  
  },[user])
    const isNewUser = async () => {
        // const result = await db.select()
        //     .from(USER_TABLE)
        //     .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress! ));
        
        // console.log(result);
        
        // if (!result[0]) {
        //     await db.insert(USER_TABLE)
        //         .values({
        //          name: user?.fullName,
        //          email: user?.primaryEmailAddress?.emailAddress,
                
        //         });
        // }
        const resp = await axios.post('/api/create-user', { user: user });
        console.log(resp.data);
    };
    return (
        <div>
            {children}
        </div>
    );
}

export default Provider;