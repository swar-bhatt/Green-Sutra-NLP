"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import {
    gujaratCities, soilTypes, previousCrops, fertilizersUsed,
    waterHardnessOptions, livestockOptions, resourcesOptions, rainfallOptions
} from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

const formSchema = z.object({
    city: z.string().min(1, "City is required."),
    soilType: z.string().min(1, "Soil type is required."),
    previousCrop: z.string().min(1, "Previous crop is required."),
    fertilizerUsed: z.string().min(1, "Fertilizer is required."),
    waterHardness: z.string().min(1, "Water hardness is required."),
    livestock: z.string().min(1, "Livestock information is required."),
    resources: z.string().min(1, "Resources information is required."),
    temperature: z.coerce.number().min(-20, "Temperature seems too low.").max(60, "Temperature seems too high."),
    rainfall: z.string().min(1, "Rainfall information is required."),
});

type CropRecommendationFormProps = {
    onSubmit: (formData: FormData) => Promise<void>;
    isLoading: boolean;
};

export default function CropRecommendationForm({ onSubmit, isLoading }: CropRecommendationFormProps) {
    const { t } = useLanguage();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            city: '',
            soilType: '',
            previousCrop: '',
            fertilizerUsed: '',
            waterHardness: '',
            livestock: '',
            resources: '',
            temperature: 28,
            rainfall: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        onSubmit(formData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{t('crop_recommendation_ai')}</CardTitle>
                <CardDescription>{t('tell_us_about_farm')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('city')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder={t('select_your_city')} /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {gujaratCities.map(city => <SelectItem key={city.value} value={city.value}>{t(city.label)}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="soilType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('soil_type')}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder={t('select_soil_type')} /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {soilTypes.map(type => <SelectItem key={type.value} value={type.value}>{t(type.label)}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="previousCrop"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('previous_crop')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {previousCrops.map(crop => <SelectItem key={crop.value} value={crop.value}>{t(crop.label)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fertilizerUsed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('fertilizer_used')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fertilizersUsed.map(f => <SelectItem key={f.value} value={f.value}>{t(f.label)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                         <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('average_temperature')} (°C)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 28" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                                control={form.control}
                                name="waterHardness"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('water_hardness')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {waterHardnessOptions.map(o => <SelectItem key={o.value} value={o.value}>{t(o.label)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rainfall"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('rainfall')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select_rainfall_level')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {rainfallOptions.map(o => <SelectItem key={o.value} value={o.value}>{t(o.label.toLowerCase())}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                                control={form.control}
                                name="livestock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('livestock')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {livestockOptions.map(o => <SelectItem key={o.value} value={o.value}>{t(o.label)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resources"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('resources')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder={t('select')} /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resourcesOptions.map(o => <SelectItem key={o.value} value={o.value}>{t(o.label)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {t('get_recommendation')}
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
