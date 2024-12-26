"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
 
function CourseList() {
    const {user} = useUser();
    const[courseList, setCourseList] = useState([]);

    useEffect( ()=>{
          user&&GetCourseList();
    },[user])
    const GetCourseList = async()=>{
        const result = await axios.post('/api/courses', 
            {
         createdBy:user?.primaryEmailAddress?.emailAddress})
         console.log(result);
         setCourseList(result.data.result);
    }
  return (
    <div className='mt-10'>
    <h2 className='font-bold text-2xl'> Your Study Material</h2> 
    <div>
        {courseList?.map((course, index)=>(
            <CourseCardItem course ={course} key={index}/>
        ))}
    </div>
    </div>
  )
}

export default CourseList