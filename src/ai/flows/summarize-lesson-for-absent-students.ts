//Summarize Lesson For Absent Students AI agent.
//
// - summarizeLessonForAbsentStudents - A function that handles the lesson summarization process for absent students.
// - SummarizeLessonForAbsentStudentsInput - The input type for the summarizeLessonForAbsentStudents function.
// - SummarizeLessonForAbsentStudentsOutput - The return type for the summarizeLessonForAbsentStudents function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLessonForAbsentStudentsInputSchema = z.object({
  lessonTitle: z.string().describe('The title of the lesson.'),
  lessonContent: z.string().describe('The content of the lesson.'),
  studentName: z.string().describe('The name of the student who was absent.'),
  className: z.string().describe('The name of the class.'),
});
export type SummarizeLessonForAbsentStudentsInput =
  z.infer<typeof SummarizeLessonForAbsentStudentsInputSchema>;

const SummarizeLessonForAbsentStudentsOutputSchema = z.object({
  summary: z.string().describe('The summary of the lesson for the absent student.'),
});
export type SummarizeLessonForAbsentStudentsOutput =
  z.infer<typeof SummarizeLessonForAbsentStudentsOutputSchema>;

export async function summarizeLessonForAbsentStudents(
  input: SummarizeLessonForAbsentStudentsInput
): Promise<SummarizeLessonForAbsentStudentsOutput> {
  return summarizeLessonForAbsentStudentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLessonForAbsentStudentsPrompt',
  input: {schema: SummarizeLessonForAbsentStudentsInputSchema},
  output: {schema: SummarizeLessonForAbsentStudentsOutputSchema},
  prompt: `You are a helpful teacher summarizing a lesson for a student who was absent.

  The student's name is {{studentName}}.
  The class name is {{className}}.
  The lesson title is {{lessonTitle}}.

  Here is the content of the lesson:
  {{lessonContent}}

  Please provide a concise and informative summary of the lesson so that the student can catch up on what they missed.`,
});

const summarizeLessonForAbsentStudentsFlow = ai.defineFlow(
  {
    name: 'summarizeLessonForAbsentStudentsFlow',
    inputSchema: SummarizeLessonForAbsentStudentsInputSchema,
    outputSchema: SummarizeLessonForAbsentStudentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
