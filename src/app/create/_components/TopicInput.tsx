import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

function TopicInput() {
  return (
    <div className='mt-10 w-full flex flex-col '>
        <h2>Enter the topic or paste the content for which you want to generate study material</h2>
          <Textarea className='mt-2' placeholder='Start writing here' />
           
           <h2 className='mt-5 mb-3'>Select the difficulty Level</h2>

           <Select>
                <SelectTrigger className="w-full">
                <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
        </Select>

    </div>
  )
}

export default TopicInput