'use server';
/**
 * @fileOverview Predicts potential crop diseases and suggests preventative measures.
 *
 * - predictCropDisease - Predicts crop diseases based on input parameters.
 * - DiseasePredictionInput - Input type for the predictCropDisease function.
 * - DiseasePredictionOutput - Return type for the predictCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiseasePredictionInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  previousCrop: z.string().describe('The crop that was previously planted.'),
  fertilizerUsed: z.string().describe('The type of fertilizer used on the farm.'),
  waterHardness: z.string().describe('The hardness of the water used for irrigation.'),
  temperature: z.number().describe('The average temperature in the city.'),
  rainfall: z.string().describe('The amount of rainfall (heavy, medium, or low).'),
});
export type DiseasePredictionInput = z.infer<typeof DiseasePredictionInputSchema>;

const DiseasePredictionOutputSchema = z.object({
  predictedDisease: z.string().describe('The predicted disease for the crop.'),
  preventionTips: z.string().describe('Tips to prevent the predicted disease.'),
});
export type DiseasePredictionOutput = z.infer<typeof DiseasePredictionOutputSchema>;

export async function predictCropDisease(input: DiseasePredictionInput): Promise<DiseasePredictionOutput> {
  return predictCropDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diseasePredictionPrompt',
  input: {schema: DiseasePredictionInputSchema},
  output: {schema: DiseasePredictionOutputSchema},
  prompt: `You are an AI agricultural expert specializing in predicting crop diseases and providing prevention tips.

  Based on the following information about the farm, predict the most likely disease to affect the crops and provide specific prevention tips.

  City: {{{city}}}
  Soil Type: {{{soilType}}}
  Previous Crop: {{{previousCrop}}}
  Fertilizer Used: {{{fertilizerUsed}}}
  Water Hardness: {{{waterHardness}}}
  Temperature: {{{temperature}}}
  Rainfall: {{{rainfall}}}

  Provide the predicted disease and prevention tips in the following format:
  {
    "predictedDisease": "The predicted disease",
    "preventionTips": "Tips to prevent the disease"
  }`,
});

const predictCropDiseaseFlow = ai.defineFlow(
  {
    name: 'predictCropDiseaseFlow',
    inputSchema: DiseasePredictionInputSchema,
    outputSchema: DiseasePredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
