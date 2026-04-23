"use server";

import { recommendCrop, type CropRecommendationInput } from "@/ai/flows/crop-recommendation-engine";
import { chatbotAssistance, type ChatbotAssistanceInput } from "@/ai/flows/chatbot-assistance-in-local-language";
import { z } from "zod";

const cropRecommendationSchema = z.object({
    city: z.string().min(1, "City is required."),
    soilType: z.string().min(1, "Soil type is required."),
    previousCrop: z.string().min(1, "Previous crop is required."),
    fertilizerUsed: z.string().min(1, "Fertilizer used is required."),
    waterHardness: z.string().min(1, "Water hardness is required."),
    livestock: z.string().min(1, "Livestock is required."),
    resources: z.string().min(1, "Resources are required."),
    temperature: z.coerce.number().min(-50).max(60, "Enter a realistic temperature."),
    rainfall: z.string().min(1, "Rainfall is required."),
    language: z.string().min(1, "Language is required."),
});

export async function getCropRecommendationAction(formData: FormData) {
    const data = Object.fromEntries(formData);
    const validatedFields = cropRecommendationSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await recommendCrop(validatedFields.data as CropRecommendationInput);
        return { data: result };
    } catch (e) {
        return { error: "An error occurred while getting the recommendation." };
    }
}

const chatbotAssistanceSchema = z.object({
    userQuestion: z.string().min(1),
    userLanguage: z.string().min(1),
});

export async function getChatbotResponseAction(input: ChatbotAssistanceInput) {
    const validatedFields = chatbotAssistanceSchema.safeParse(input);

    if (!validatedFields.success) {
        return {
            error: "Invalid input for chatbot.",
        };
    }

    try {
        const result = await chatbotAssistance(validatedFields.data);
        return { data: result };
    } catch (e) {
        return { error: "An error occurred while getting the chatbot response." };
    }
}
