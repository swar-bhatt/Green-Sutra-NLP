'use server';
/**
 * @fileOverview A chatbot assistance AI agent that provides immediate assistance in the user's local language.
 *
 * - chatbotAssistance - A function that handles the chatbot assistance process.
 * - ChatbotAssistanceInput - The input type for the chatbotAssistance function.
 * - ChatbotAssistanceOutput - The return type for the chatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistanceInputSchema = z.object({
  userQuestion: z.string().describe('The question asked by the farmer.'),
  userLanguage: z.string().describe('The language of the farmer.'),
});
export type ChatbotAssistanceInput = z.infer<typeof ChatbotAssistanceInputSchema>;

const ChatbotAssistanceOutputSchema = z.object({
  chatbotResponse: z.string().describe('The response from the chatbot in the user specified language.'),
});
export type ChatbotAssistanceOutput = z.infer<typeof ChatbotAssistanceOutputSchema>;

export async function chatbotAssistance(input: ChatbotAssistanceInput): Promise<ChatbotAssistanceOutput> {
  return chatbotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAssistancePrompt',
  input: {schema: ChatbotAssistanceInputSchema},
  output: {schema: ChatbotAssistanceOutputSchema},
  prompt: `You are a helpful farming assistant chatbot that can answer farmer questions in any language.

  The farmer will ask a question in their local language, and you will respond in the same language.

  Question: {{{userQuestion}}}
  Language: {{{userLanguage}}}`,
});

const chatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'chatbotAssistanceFlow',
    inputSchema: ChatbotAssistanceInputSchema,
    outputSchema: ChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
