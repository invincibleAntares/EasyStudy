import { Button } from '@/components/ui/button';
import React from 'react';

interface StepProgressProps {
  stepCount: number;
  setStepCount: React.Dispatch<React.SetStateAction<number>>;
  data: string[];
}

const StepProgress: React.FC<StepProgressProps> = ({ stepCount, setStepCount, data }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      {/* Previous Button */}
      {stepCount > 0 && (
        <Button
          variant="outline"
          className="border px-4 py-1 rounded"
          onClick={() => setStepCount(stepCount - 1)}
        >
          Previous
        </Button>
      )}

      {/* Progress Bar */}
      <div className="flex gap-2 flex-1 items-center">
        {data.map((_, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index < stepCount ? 'bg-primary' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        className="border px-4 py-1 rounded"
        onClick={() => {
          if (stepCount < data.length) setStepCount(stepCount + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default StepProgress;
