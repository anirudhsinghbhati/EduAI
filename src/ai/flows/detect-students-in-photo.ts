
'use server';
/**
 * @fileOverview An AI agent that detects which students are present in a classroom photo.
 *
 * - detectStudentsInPhoto - A function that handles the student detection process.
 * - DetectStudentsInput - The input type for the detectStudentsInPhoto function.
 * - DetectStudentsOutput - The return type for the detectStudentsInPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentSchema = z.object({
  id: z.string().describe('The unique identifier for the student.'),
  name: z.string().describe('The name of the student.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the student, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

const DetectStudentsInputSchema = z.object({
  classPhotoDataUri: z
    .string()
    .describe(
      "A photo of the classroom, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  studentRoster: z
    .array(StudentSchema)
    .describe('A list of all students in the class.'),
});
export type DetectStudentsInput = z.infer<typeof DetectStudentsInputSchema>;

const DetectStudentsOutputSchema = z.object({
  presentStudentIds: z
    .array(z.string())
    .describe(
      'A list of IDs for the students identified as present in the class photo.'
    ),
});
export type DetectStudentsOutput = z.infer<typeof DetectStudentsOutputSchema>;

export async function detectStudentsInPhoto(
  input: DetectStudentsInput
): Promise<DetectStudentsOutput> {
  return detectStudentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectStudentsPrompt',
  input: {schema: DetectStudentsInputSchema},
  output: {schema: DetectStudentsOutputSchema},
  prompt: `You are an expert AI in facial recognition. You will be given a main classroom photo and a list of students with their individual photos.

Your task is to carefully compare each student's photo from the list with the faces visible in the classroom photo.

Based on your analysis, identify all the students who are present in the classroom photo and return a list of their IDs in the 'presentStudentIds' field.

Classroom Photo:
{{media url=classPhotoDataUri}}

Student List:
{{#each studentRoster}}
- Student ID: {{{id}}}, Name: {{{name}}}
  Photo: {{media url=photoDataUri}}
{{/each}}
`,
});

const detectStudentsFlow = ai.defineFlow(
  {
    name: 'detectStudentsFlow',
    inputSchema: DetectStudentsInputSchema,
    outputSchema: DetectStudentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
