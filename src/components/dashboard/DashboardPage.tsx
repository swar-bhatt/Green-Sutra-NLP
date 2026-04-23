"use client";

import { useState, useEffect } from 'react';
import type { CropRecommendationOutput } from '@/ai/flows/crop-recommendation-engine';
import { getCropRecommendationAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import CropRecommendationForm from './CropRecommendationForm';
import RecommendationResult from './RecommendationResult';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Sprout } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import { useLanguage } from '@/context/LanguageContext';

export default function DashboardPage() {
    const [recommendation, setRecommendation] = useState<CropRecommendationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { t, language } = useLanguage();

    useEffect(() => {
        // Clear the recommendation when the language changes
        setRecommendation(null);
    }, [language]);

    const handleFormSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setRecommendation(null);
        
        formData.append('language', language);
        const result = await getCropRecommendationAction(formData);

        setIsLoading(false);

        if (result.error) {
            let errorMessage = "An unknown error occurred.";
            if (typeof result.error === 'string') {
                errorMessage = result.error;
            } else if (typeof result.error === 'object') {
                 // Flatten and join error messages
                errorMessage = Object.values(result.error).flat().join(' ');
            }
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } else if (result.data) {
            setRecommendation(result.data);
            toast({
                title: t('our_recommendation'),
                description: `${t('we_recommend_planting')} ${result.data.recommendedCrop}.`,
                className: 'bg-primary text-primary-foreground'
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex flex-col gap-6">
                <CropRecommendationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                <WeatherWidget />
            </div>
            <div className="lg:col-span-2">
                {isLoading && <LoadingState />}
                {recommendation && <RecommendationResult result={recommendation} />}
                {!isLoading && !recommendation && <EmptyState />}
            </div>
        </div>
    );
}

function LoadingState() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    const { t } = useLanguage();
    return (
        <Card className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 border-dashed">
            <CardHeader>
                <CardTitle>{t('get_your_crop_recommendation')}</CardTitle>
                <CardDescription>{t('fill_out_form_prompt')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Sprout className="h-24 w-24 text-muted-foreground" />
            </CardContent>
        </Card>
    )
}
