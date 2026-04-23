'use server';
/**
 * @fileOverview An AI agent that recommends the most suitable crop for a farm based on various input parameters.
 *
 * - recommendCrop - A function that handles the crop recommendation process.
 * - CropRecommendationInput - The input type for the recommendCrop function.
 * - CropRecommendationOutput - The return type for the recommendCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  previousCrop: z.string().describe('The crop that was previously grown on the farm.'),
  fertilizerUsed: z.string().describe('The type of fertilizer used on the previous crop.'),
  waterHardness: z.string().describe('The hardness of the water used for irrigation.'),
  livestock: z.string().describe('The type of livestock present on the farm.'),
  resources: z.string().describe('The resources available to the farmer.'),
  temperature: z.number().describe('The average temperature in the city.'),
  rainfall: z.string().describe('The amount of rainfall in the city (heavy, medium, or low).'),
  language: z.string().describe('The language for the response (e.g., "en" for English, "gu" for Gujarati).'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  recommendedCrop: z.string().describe('The recommended crop for the next planting cycle.'),
  waterNeeded: z.string().describe('The amount of water needed for the recommended crop (L/ha).'),
  fertilizerRecommendation: z
    .string()
    .describe('The recommendation for fertilizer to be used for the recommended crop.'),
  cropProtectionTips: z.string().describe('Basic tips to protect the recommended crop.'),
  limitedResourcesTips:
    z.string().describe('How to utilize limited resources for the recommended crop.'),
  predictedDisease: z.string().describe('The predicted disease for the recommended crop.'),
  diseasePreventionTips:
    z.string().describe('Tips to prevent the predicted disease for the recommended crop.'),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

export async function recommendCrop(
  input: CropRecommendationInput
): Promise<CropRecommendationOutput> {
  return recommendCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  prompt: `You are an expert agriculture advisor for farms in Gujarat, India.

  Based on the following information, recommend the most suitable crop for the next planting cycle. Provide the water needed, fertilizer recommendation, crop protection tips, limited resources tips, predicted disease and disease prevention tips in your answer.

  The entire response, including all field values in the output JSON, must be in the specified language: {{{language}}}. For example, if the language is 'gu', all strings must be in Gujarati.

  City: {{{city}}}
  Soil Type: {{{soilType}}}
  Previous Crop: {{{previousCrop}}}
  Fertilizer Used: {{{fertilizerUsed}}}
  Water Hardness: {{{waterHardness}}}
  Livestock: {{{livestock}}}
  Resources: {{{resources}}}
  Temperature: {{{temperature}}}
  Rainfall: {{{rainfall}}}
  Language: {{{language}}}

  Please provide your recommendation in the following JSON format:
  {
    "recommendedCrop": "<recommended crop>",
    "waterNeeded": "<water needed in L/ha>",
    "fertilizerRecommendation": "<fertilizer recommendation>",
    "cropProtectionTips": "<crop protection tips>",
    "limitedResourcesTips": "<limited resources tips>",
    "predictedDisease": "<predicted disease>",
    "diseasePreventionTips": "<disease prevention tips>"
  }`,
});

const recommendCropFlow = ai.defineFlow(
  {
    name: 'recommendCropFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
