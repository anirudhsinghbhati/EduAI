'use server';

import { generatePersonalizedRecommendations } from '@/ai/flows/personalized-learning-recommendations';
import type { PersonalizedRecommendationsInput } from '@/ai/flows/personalized-learning-recommendations';

export async function getLearningRecommendations(input: PersonalizedRecommendationsInput) {
  try {
    const result = await generatePersonalizedRecommendations(input);
    return result.recommendations;
  } catch (error) {
    console.error("Error generating learning recommendations:", error);
    return "Sorry, I couldn't generate recommendations at this time. Please try again later.";
  }
}
