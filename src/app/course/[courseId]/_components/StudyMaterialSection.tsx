 'use client'
import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'

function StudyMaterialSection({courseId}) {
    
   const [studyTypeContent, setStudyTypeContent] = useState();
    const MaterialList = [
       {
        name: 'Notes/Chapters',
        desc: 'Read notes to prepare it',
        icon:  '/notes.png',
        path: '/notes'
       },
       {
        name: 'Flashcard',
        desc: 'Flashcard help to remember the concepts',
        icon: '/flashcard.png',
        path: '/flashcard'
       },
         {
          name: 'Quiz',
          desc: 'Great Way to test your knowledge',
          icon: '/quiz.png',
          path: '/quiz'
         },
         {
            name: 'Question/Answer',
            desc:  'Help to practice your learning',
            icon: '/qa.png',
            path: '/qa'
         }
    ]


     useEffect(()=>{
          GetStudyMaterial();
     },[])
     
      const GetStudyMaterial = async()=>{
        const result = await axios.post('/api/study-type',{
          courseId: courseId,
          studyType: 'ALL'
        })
        console.log(result?.data);
        setStudyTypeContent(result.data);
      }

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>
         
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item, index) => (
                <MaterialCardItem key={index} item={item} />
            ))}
          </div>

    </div>
  )
}

export default StudyMaterialSection
