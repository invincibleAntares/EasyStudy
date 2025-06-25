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

  useEffect(() => {
    GetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      
      // Get course data to extract chapter info
      const courseResult = await axios.get(`/api/courses?courseId=${courseId}`);
      const course = courseResult.data.result;
      const chapters = course?.courseLayout?.chapters || [];
      
      const formattedNotes = (result?.data || []).map((note: any, index: number) => {
        // Notes are stored as HTML strings, so we don't need to parse them as JSON
        // Instead, we combine the chapter info with the HTML content
        const chapter = chapters[note.chapterId] || chapters[index] || {};
        return {
          chapterId: note.chapterId || index,
          chapterTitle: chapter.chapterTitle || `Chapter ${index + 1}`,
          chapterSummary: chapter.chapterSummary || '',
          emoji: chapter.emoji || '📚',
          topics: chapter.topics || [],
          content: note.notes // This is the HTML content
        };
      });
      
      setNotes(formattedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    notes.length > 0 && (
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

        <div>
          <div className="text-xl font-bold flex items-center gap-2">
            {notes[stepCount]?.emoji} {notes[stepCount]?.chapterTitle}
          </div>
          <div className="text-gray-600">{notes[stepCount]?.chapterSummary}</div>

          {Array.isArray(notes[stepCount]?.topics) && (
            <ul className="list-disc ml-5">
              {notes[stepCount].topics.map((topic: any, index: number) => (
                <li key={index}>
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
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.content }}
          />

          {stepCount === notes.length - 1 && (
            <div className="mt-10 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                End of Notes
              </h2>
              <Button
                onClick={() => router.back()}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Go to Course Page
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ViewNotes;