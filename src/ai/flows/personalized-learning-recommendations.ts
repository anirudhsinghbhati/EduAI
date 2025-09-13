// src/ai/flows/personalized-learning-recommendations.ts
'use server';

/**
 * @fileOverview AI-powered personalized learning recommendation agent.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized learning recommendations for students.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe(
      'A detailed profile of the student, including their learning history, preferences, and goals.'
    ),
  pastPerformance: z
    .string()
    .describe(
      'A summary of the students past academic performance, including grades, test scores, and areas of strength and weakness.'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized learning recommendations, including specific topics to study, resources to use, and strategies to implement.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI-powered learning assistant that provides personalized learning recommendations to students.

  Based on the student's profile and past performance, you will generate a list of recommendations that are tailored to their individual needs and goals.

  Student Profile: {{{studentProfile}}}
  Past Performance: {{{pastPerformance}}}

  Recommendations:
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
