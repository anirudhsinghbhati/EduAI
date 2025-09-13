'use server';
/**
 * @fileOverview Generates personalized study tips for students based on their courses, academic performance, and attendance.
 *
 * - generateStudyTips - A function that generates study tips for a student.
 * - StudyTipInput - The input type for the generateStudyTips function.
 * - StudyTipOutput - The return type for the generateStudyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyTipInputSchema = z.object({
  courses: z
    .string()
    .describe('The courses the student is currently taking.'),
  academicPerformance: z
    .string()
    .describe('A description of the student\'s academic performance.'),
  attendance: z.string().describe('A description of the student\'s attendance record.'),
});
export type StudyTipInput = z.infer<typeof StudyTipInputSchema>;

const StudyTipOutputSchema = z.object({
  studyTips: z
    .string()
    .describe('A list of personalized study tips for the student.'),
});
export type StudyTipOutput = z.infer<typeof StudyTipOutputSchema>;

export async function generateStudyTips(input: StudyTipInput): Promise<StudyTipOutput> {
  return generateStudyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyTipPrompt',
  input: {schema: StudyTipInputSchema},
  output: {schema: StudyTipOutputSchema},
  prompt: `You are an AI study advisor. Generate a list of personalized study tips for a student based on the following information:

Courses: {{{courses}}}
Academic Performance: {{{academicPerformance}}}
Attendance: {{{attendance}}}

Study Tips:`,
});

const generateStudyTipsFlow = ai.defineFlow(
  {
    name: 'generateStudyTipsFlow',
    inputSchema: StudyTipInputSchema,
    outputSchema: StudyTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
