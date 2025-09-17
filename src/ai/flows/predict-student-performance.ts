'use server';
/**
 * @fileOverview An AI agent that predicts student performance and identifies at-risk students.
 *
 * - predictStudentPerformance - A function that handles the student performance prediction process.
 * - PredictStudentPerformanceInput - The input type for the predictStudentPerformance function.
 * - PredictStudentPerformanceOutput - The return type for the predictStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStudentPerformanceInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  recentGrades: z.string().describe("A summary of the student's recent grades or academic performance."),
  attendancePercentage: z.number().describe("The student's overall attendance percentage."),
  behavioralNotes: z.string().optional().describe("Any relevant notes on the student's behavior or engagement."),
});
export type PredictStudentPerformanceInput = z.infer<typeof PredictStudentPerformanceInputSchema>;

const PredictStudentPerformanceOutputSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The predicted risk level for the student.'),
  predictionSummary: z.string().describe("A summary of the AI's prediction regarding the student's future performance and potential challenges."),
  recommendedInterventions: z.array(z.string()).describe('A list of recommended actions or interventions to support the student.'),
});
export type PredictStudentPerformanceOutput = z.infer<typeof PredictStudentPerformanceOutputSchema>;

export async function predictStudentPerformance(
  input: PredictStudentPerformanceInput
): Promise<PredictStudentPerformanceOutput> {
  return predictStudentPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictStudentPerformancePrompt',
  input: {schema: PredictStudentPerformanceInputSchema},
  output: {schema: PredictStudentPerformanceOutputSchema},
  prompt: `You are an expert educational psychologist and student counselor. Your task is to analyze the provided student data to create an early warning report.

Based on the student's recent grades, attendance, and any behavioral notes, predict their risk level for academic decline.

Provide a concise summary explaining your prediction and list actionable, supportive interventions that a counselor or teacher could implement to help the student succeed.

Student Name: {{{studentName}}}
Recent Grades: {{{recentGrades}}}
Attendance: {{{attendancePercentage}}}%
{{#if behavioralNotes}}
Behavioral Notes: {{{behavioralNotes}}}
{{/if}}
`,
});

const predictStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'predictStudentPerformanceFlow',
    inputSchema: PredictStudentPerformanceInputSchema,
    outputSchema: PredictStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
