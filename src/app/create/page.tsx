"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const[loading, setLoading] = useState(false);
     
  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    if (!fieldValue) {
      console.error(`Invalid value for ${fieldName}`);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log("Updated Form Data:", formData);
  };

  const GenerateCourseOutline = async () => {
    try {
      setLoading(true);
        const courseId = uuidv4();
        console.log('Form Data Before API Call:', formData);

        if (!formData.studyType || !formData.topic || !formData.difficultyLevel) {
            throw new Error('All fields are required');
        }

        const response = await axios.post('/api/generate-course-outline', {
            courseId,
            courseType: formData.studyType,
            topic: formData.topic,
            difficultyLevel: formData.difficultyLevel,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        });
      setLoading(false);

      router.replace('/dashboard');
      // Toast Notification 
      toast("Your Course Content is generating, Click on Refresh Button")


        console.log('API Response:', response.data.result.resp);
    } catch (error) {
        console.error('Error generating course outline:', error.message);
    }
};

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-10">
      <h2 className="font-bold text-4xl text-primary">Start Building Your Personal Study Material</h2>
      <p className="text-gray-500 text-lg">
        Fill All details in order to generate study material for your next project
      </p>

      <div className="mt-10">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-32">
        {step !== 0 ? (
          <Button variant={"outline"} onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        ) : (
          "-"
        )}
        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={GenerateCourseOutline} disabled={loading}>
           {loading?<Loader className="animate-spin"/>:'Generate'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Create;
