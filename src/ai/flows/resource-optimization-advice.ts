'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing advice on how to optimize the use of limited resources like water and fertilizer for a recommended crop.
 *
 * - getResourceOptimizationAdvice - A function that calls the resource optimization advice flow.
 * - ResourceOptimizationInput - The input type for the getResourceOptimizationAdvice function.
 * - ResourceOptimizationOutput - The return type for the getResourceOptimizationAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResourceOptimizationInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  previousCrop: z.string().describe('The crop that was previously grown on the farm.'),
  fertilizerUsed: z.string().describe('The type of fertilizer used for the previous crop.'),
  waterHardness: z.string().describe('The hardness of the water used for irrigation.'),
  livestock: z.string().describe('The type of livestock present on the farm.'),
  resources: z.string().describe('The resources available to the farmer.'),
  temperature: z.number().describe('The average temperature in the city.'),
  rainfall: z.string().describe('The amount of rainfall (heavy, medium, or low).'),
  recommendedCrop: z.string().describe('The recommended crop for the next planting cycle.'),
});
export type ResourceOptimizationInput = z.infer<typeof ResourceOptimizationInputSchema>;

const ResourceOptimizationOutputSchema = z.object({
  waterOptimizationAdvice: z.string().describe('Advice on how to optimize water usage for the recommended crop.'),
  fertilizerOptimizationAdvice: z.string().describe('Advice on how to optimize fertilizer usage for the recommended crop.'),
  limitedResourcesTip: z.string().describe('Advice on how to utilize limited resources in general.'),
});
export type ResourceOptimizationOutput = z.infer<typeof ResourceOptimizationOutputSchema>;

export async function getResourceOptimizationAdvice(
  input: ResourceOptimizationInput
): Promise<ResourceOptimizationOutput> {
  return resourceOptimizationFlow(input);
}

const resourceOptimizationPrompt = ai.definePrompt({
  name: 'resourceOptimizationPrompt',
  input: {schema: ResourceOptimizationInputSchema},
  output: {schema: ResourceOptimizationOutputSchema},
  prompt: `You are an expert agricultural advisor providing advice to farmers in Gujarat, India.

  Based on the following information, provide specific advice on how to optimize the use of limited resources like water and fertilizer for the recommended crop, so that the farmer can reduce waste and improve efficiency.

  City: {{{city}}}
  Soil Type: {{{soilType}}}
  Previous Crop: {{{previousCrop}}}
  Fertilizer Used: {{{fertilizerUsed}}}
  Water Hardness: {{{waterHardness}}}
  Livestock: {{{livestock}}}
  Resources: {{{resources}}}
  Temperature: {{{temperature}}}
  Rainfall: {{{rainfall}}}
  Recommended Crop: {{{recommendedCrop}}}

  Respond with specific actionable advice for:
  - waterOptimizationAdvice: How to optimize water usage for the recommended crop.
  - fertilizerOptimizationAdvice: How to optimize fertilizer usage for the recommended crop.
  - limitedResourcesTip: General advice on how to utilize limited resources.
  `,
});

const resourceOptimizationFlow = ai.defineFlow(
  {
    name: 'resourceOptimizationFlow',
    inputSchema: ResourceOptimizationInputSchema,
    outputSchema: ResourceOptimizationOutputSchema,
  },
  async input => {
    const {output} = await resourceOptimizationPrompt(input);
    return output!;
  }
);
