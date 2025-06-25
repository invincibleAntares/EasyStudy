'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

function QACardItem({qaPair}: any) {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset answer visibility when question changes
  useEffect(() => {
    setShowAnswer(false);
  }, [qaPair]);

  return (
    <div className='mt-10 p-6 border rounded-lg shadow-sm bg-white'>
      <div className='mb-6'>
        <div className='flex items-center gap-2 mb-3'>
          <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold'>
            Q
          </div>
          <h3 className='font-semibold text-gray-700'>Question</h3>
        </div>
        <h2 className='font-medium text-lg text-gray-800 leading-relaxed'>
          {qaPair?.question}
        </h2>
      </div>

      <div className='mb-6'>
        <Button 
          onClick={() => setShowAnswer(!showAnswer)}
          variant={showAnswer ? "default" : "outline"}
          className='mb-4'
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
        
        {showAnswer && (
          <div className='border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold'>
                A
              </div>
              <h3 className='font-semibold text-gray-700'>Answer</h3>
            </div>
            <p className='text-gray-800 leading-relaxed whitespace-pre-line'>
              {qaPair?.answer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QACardItem 