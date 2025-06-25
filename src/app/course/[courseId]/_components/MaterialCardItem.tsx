 "use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function MaterialCardItem({item,studyTypeContent,course,refreshData}: any) {
      const[loading, setLoading] = useState(false);
      
    // Map display names to API types
    const getApiType = (itemName: string) => {
      switch(itemName) {
        case 'Flashcard': return 'Flashcard';
        case 'Quiz': return 'Quiz';
        case 'Question/Answer': return 'QA';
        case 'Notes': return 'Notes';
        default: return itemName;
      }
    };
    
    const GenerateContent  = async() => {
      setLoading(true);
      try {
        let chapters = '';
        course?.courseLayout.chapters.forEach((chapter: any)=>{
          chapters = chapter.chapterTitle + ',' + chapters;
        });
        console.log(chapters);
        const result = await axios.post('/api/study-type-content', {
           courseId: course?.courseId,
           type: getApiType(item.name),
           chapters: chapters
        });
        console.log(result);
        // Keep refreshing until content is ready
        await refreshData(true);
      } catch (error) {
        console.error('Error generating content:', error);
      } finally {
        setLoading(false);
      }
    }

   
  const isContentReady = studyTypeContent?.[item.type]?.length > 0;
  const isGenerating = loading;

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
      ${!isContentReady && 'grayscale'}
    `}>
      
    {isGenerating ? 
      <h2 className='p-1 px-2 bg-yellow-500 text-white rounded-full text-[10px] mb-2'>Generating...</h2>
    : !isContentReady ? 
      <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Generate</h2>
    : <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>
    }
        <Image src={item.icon} alt={item.name} width={50} height={50} /> 
     <h2 className='font-medium mt-3'>{item.name}</h2>
     <p className='text-gray-500 text-sm text-center'> {item.desc}</p>
   
     { !isContentReady || isGenerating?
       <Button className='mt-3 w-full' variant={"outline"} onClick={GenerateContent} disabled={isGenerating}>  
        {isGenerating && <RefreshCcw className='animate-spin'/>}
        {isGenerating ? 'Generating...' : 'Generate'}
       </Button>
     : 
       <Link href={'/course/'+course?.courseId+item.path} className='mt-3 w-full'>
         <Button className='w-full' variant={"outline"}>View</Button>
       </Link>
     } 

   </div>
  )
}
  
export default MaterialCardItem