 'use client'
import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'

function StudyMaterialSection({courseId,course}: any) {
    
   const [studyTypeContent, setStudyTypeContent] = useState<any>();
   const [loading, setLoading] = useState(false);
   
    const MaterialList = [
       {
        name: 'Notes/Chapters',
        desc: 'Read notes to prepare for your exam',
        icon:  '/notes.png',
        path: '/notes',
        type: 'notes'
       },
       {
        name: 'Flashcard',
        desc: 'Flashcards help to remember key concepts',
        icon: '/flashcard.png',
        path: '/flashcards',
         type: 'flashcard'
       },
         {
          name: 'Quiz',
          desc: 'Great way to test your knowledge',
          icon: '/quiz.png',
          path: '/quiz',
          type: 'quiz'
         },
         {
            name: 'Question/Answer',
            desc:  'Practice with comprehensive Q&A sessions',
            icon: '/qa.png',
            path: '/qa',
            type: 'qa'
         }
    ]

     useEffect(()=>{
          GetStudyMaterial();
     },[courseId])
     
      const GetStudyMaterial = async(showLoading = false)=>{
        if (showLoading) setLoading(true);
        try {
          const result = await axios.post('/api/study-type',{
            courseId: courseId,
            studyType: 'ALL'
          })
          console.log(result?.data);
          setStudyTypeContent(result.data);
        } catch (error) {
          console.error('Error fetching study materials:', error);
        } finally {
          if (showLoading) setLoading(false);
        }
      }

  return (
    <div className='mt-5'>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium text-xl'>Study Material</h2>
          {loading && (
            <div className='text-sm text-gray-500 flex items-center gap-2'>
              <div className='animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full'></div>
              Refreshing...
            </div>
          )}
        </div>
         
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item, index) => ( 
                <MaterialCardItem key={index} item={item}
                  studyTypeContent={studyTypeContent}
                  course ={course} refreshData={GetStudyMaterial}
                />
        
            ))}
          </div>

    </div>
  )
}

export default StudyMaterialSection
