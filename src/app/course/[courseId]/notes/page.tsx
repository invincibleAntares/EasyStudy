"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Notes",
      });
      
      // The notes content is stored in the same format as other study types
      const notesContent = result.data?.content?.chapters || [];
      setNotes(notesContent);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    GetNotes();
  }, [courseId]);

  return (
    <div>
      {notes.length > 0 && (
        <div>
          <div className="flex gap-5 items-center">
            {stepCount !== 0 && (
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setStepCount(stepCount - 1)}
              >
                Previous
              </Button>
            )}

            {notes.map((_, index) => (
              <div
                key={index}
                className={`w-full h-2 rounded-full ${
                  index <= stepCount ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
            ))}

            {stepCount < notes.length - 1 && (
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setStepCount(stepCount + 1)}
              >
                Next
              </Button>
            )}
          </div>

          <div className="mt-5">
            <div className="text-xl font-bold flex items-center gap-2">
              {notes[stepCount]?.emoji} {notes[stepCount]?.chapterTitle}
            </div>
            <div className="text-gray-600 mt-2">{notes[stepCount]?.chapterSummary}</div>

            {Array.isArray(notes[stepCount]?.topics) && (
              <ul className="list-disc ml-5 mt-4">
                {notes[stepCount].topics.map((topic: any, index: number) => (
                  <li key={index} className="text-gray-700">
                    {typeof topic === "object" ? (
                      <>
                        <div className="font-semibold">{topic.topicTitle}</div>
                        <div>{topic.topicContent}</div>
                      </>
                    ) : (
                      topic
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div
              className="mt-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: notes[stepCount]?.content || '' }}
            />

            {stepCount === notes.length - 1 && (
              <div className="mt-10 text-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  End of Notes
                </h2>
                <Button
                  onClick={() => router.back()}
                  className="mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
                >
                  Go to Course Page
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {notes.length === 0 && (
        <div className="p-5 text-center">
          <h2 className="text-xl font-semibold mb-2">No Notes Available</h2>
          <p className="text-gray-600">Please generate notes from the course page first.</p>
          <Button
            onClick={() => router.back()}
            className="mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md"
          >
            Go Back to Course
          </Button>
        </div>
      )}
    </div>
  );
}

export default ViewNotes;