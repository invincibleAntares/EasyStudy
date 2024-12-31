"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import FlashCardItem from "./FlashCardItem";

function Flashcards() {
  const {courseId} = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState();
  useEffect( ()=>{
    GetFlashCards();
  },[])

  const GetFlashCards= async()=>{
   const result  = await axios.post('/api/study-type',{
      courseId: courseId,
      studyType: "Flashcard"
   });
   setFlashcards(result?.data);
   console.log('Flashcard',result.data);
  }
  const  handleClick = () =>{
   setIsFlipped(!isFlipped);
  }
  return (
    <div>
      <h2 className="font-bold text-2xl">Flashcards</h2>
      <p>Flashcards: The Ultimate Tool to Lock in Concepts! </p>
        <div className=" mt-10">  
                    <Carousel>
              <CarouselContent>
                {flashcards?.content?.length>0&&flashcards.content?.map((flashcard,index)=>(
                <CarouselItem key={index} className="flex items-center justify-center">
                <FlashCardItem handleClick={handleClick} isFlipped={isFlipped}
                 flashcard={flashcard}
                />
                </CarouselItem>
                ))} 
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        
       
        </div>
      
    </div>
  )
}

export default Flashcards