"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateNotesForCourse = async (course: any) => {
    setGenerating(true);
    try {
      const chapters = course?.courseLayout?.chapters || [];
      
      // Generate notes for each chapter one by one
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const NOTES_PROMPT = 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters:' + JSON.stringify(chapter);
        
        await axios.post('/api/generate-notes', {
          courseId: courseId,
          chapterId: index,
          prompt: NOTES_PROMPT
        });
      }
      
      // Refresh notes after generation
      await GetNotes();
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setGenerating(false);
    }
  };

  const GetNotes = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      
      // Get course data to extract chapter info
      const courseResult = await axios.get(`/api/courses?courseId=${courseId}`);
      const course = courseResult.data.result;
      const chapters = course?.courseLayout?.chapters || [];
      
      // Check if notes exist
      if (!result.data || result.data.length === 0) {
        // No notes exist, generate them
        setLoading(false);
        await generateNotesForCourse(course);
        return;
      }
      
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
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading || generating) {
    return (
      <div className="p-5 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">
          {generating ? 'Generating Notes...' : 'Loading Notes...'}
        </h2>
        <p className="text-gray-600">
          {generating ? 'Please wait while we create comprehensive study notes for each chapter.' : 'Fetching your study materials...'}
        </p>
      </div>
    );
  }

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