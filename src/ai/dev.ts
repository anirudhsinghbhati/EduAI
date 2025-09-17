import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-lesson-for-absent-students.ts';
import '@/ai/flows/personalized-learning-recommendations.ts';
import '@/ai/flows/ai-study-tip-generator.ts';
import '@/ai/flows/detect-students-in-photo.ts';
import '@/ai/flows/predict-student-performance.ts';
