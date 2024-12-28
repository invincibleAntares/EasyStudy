import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

function CourseIntroCard({course}) {
  return (
    <div className='flex gap-5 items-center border shadow-md rounded-lg  p-10'>
      <Image src={'/knowledge.png'} alt='other' width={70} height={70} />  
       <div>
          <h2 className='font-bold text-2xl'>{course?.courseLayout.courseTitle}</h2>
       
       <p className='text-sm'>{course?.courseLayout?.courseSummary} </p>
       <Progress className='mt-3' />
       <h2 className='mt-3 text-lg text-primary'> Total chapter : {course?.courseLayout?.chapters?.length} </h2>
       </div>
    </div>

  )
}

export default CourseIntroCard