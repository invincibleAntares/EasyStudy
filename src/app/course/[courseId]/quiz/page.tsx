'use client';

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgess";
import QuizCardItem from "./_components/QuizCardItem";

function Quiz() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState<any[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [correctAns, setCorrectAns] = useState<boolean | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);

  const GetQuiz = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'Quiz',
    });

    setQuiz(result.data?.content?.questions || []);
  };

  useEffect(() => {
    GetQuiz();
  }, [courseId]);

  const checkAnswer = (userAnswer: string, currentQuestion: any) => {
    if (userAnswer === currentQuestion.answer) {
      setCorrectAns(true);
      setCorrectOption(null); 
      return;
    }
    setCorrectAns(false);
    setCorrectOption(currentQuestion.answer); // Display the correct option
  };

  useEffect(() => {
    setCorrectAns(null); // Reset feedback when moving to the next question
    setCorrectOption(null);
  }, [stepCount]);

  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl mb-4">Quiz</h2>
      <StepProgress
        data={quiz}
        stepCount={stepCount}
        setStepCount={(value) => setStepCount(value)}
      />
      <div className="my-5">
        {quiz[stepCount] && (
          <QuizCardItem
            quiz={quiz[stepCount]}
            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
          />
        )}
      </div>
      {correctAns === false && (
        <div className="mt-4 p-4 border border-red-500 rounded bg-red-100 text-red-700">
          <h2 className="font-bold">Incorrect Answer</h2>
          {correctOption && (
            <p className="mt-2">The correct answer is: <span className="font-bold">{correctOption}</span></p>
          )}
        </div>
      )}
      {correctAns === true && (
        <div className="mt-4 p-4 border border-green-500 rounded bg-green-100 text-green-700">
          <h2 className="font-bold">Correct Answer</h2>
        </div>
      )}
    </div>
  );
}

export default Quiz;
