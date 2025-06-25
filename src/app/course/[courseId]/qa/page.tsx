'use client';

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgess";
import QACardItem from "./_components/QACardItem";

function QAPage() {
  const { courseId } = useParams();
  const [qaPairs, setQAPairs] = useState<any[]>([]);
  const [stepCount, setStepCount] = useState(0);

  const GetQA = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'QA',
    });

    setQAPairs(result.data?.content?.qaPairs || []);
  };

  useEffect(() => {
    GetQA();
  }, [courseId]);

  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl mb-4">Question & Answer Session</h2>
      <p className="text-gray-600 mb-6">Practice with comprehensive Q&A to master your concepts</p>
      
      <StepProgress
        data={qaPairs}
        stepCount={stepCount}
        setStepCount={(value) => setStepCount(value)}
      />
      
      <div className="my-5">
        {qaPairs[stepCount] && (
          <QACardItem
            qaPair={qaPairs[stepCount]}
          />
        )}
      </div>
      
      {stepCount === qaPairs.length - 1 && qaPairs.length > 0 && (
        <div className="mt-10 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            You&apos;ve completed all Q&A pairs!
          </h2>
          <p className="text-gray-500 mt-2">Great job on your study session!</p>
        </div>
      )}
    </div>
  );
}

export default QAPage; 