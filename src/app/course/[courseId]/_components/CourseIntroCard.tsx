import Image from 'next/image'
import React from 'react'

function CourseIntroCard({course}) {
  return (
    <div className='flex gap-5 items-center border shadow-md rounded-lg w-full p-5'>
      <Image src={'/knowledge.png'} alt='other' width={70} height={70} />  
       <div>
          <h2 className='font-bold text-2xl'>{course?.courseLayout.courseTitle}</h2>
       
       <p>{course?.courseLayout?.courseSummary} </p>
       </div>
    </div>

  )
}

export default CourseIntroCard