"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useLanguage } from '@/context/LanguageContext';

const weatherIcons = {
    'Sunny': Sun,
    'Partly Cloudy': CloudSun,
    'Cloudy': Cloud,
    'Rainy': CloudRain,
};

type WeatherType = keyof typeof weatherIcons;

export default function WeatherWidget() {
    const { t } = useLanguage();
    const [temp, setTemp] = useState<number | null>(null);
    const [weather, setWeather] = useState<WeatherType | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            // Mock weather data as we don't have a real API.
            // This will run only on the client to avoid hydration errors.
            setTemp(Math.floor(Math.random() * 15) + 20); // Random temp between 20 and 35
            const weathers: WeatherType[] = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'];
            setWeather(weathers[Math.floor(Math.random() * weathers.length)]);
        }
    }, [isMounted]);

    if (!isMounted) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{t('current_weather')}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const WeatherIcon = weather ? weatherIcons[weather] : null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('current_weather')}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                {temp !== null && weather !== null && WeatherIcon ? (
                    <div className="flex items-center gap-4">
                        <WeatherIcon className="h-12 w-12 text-yellow-400" />
                        <div>
                            <p className="text-4xl font-bold">{temp}°C</p>
                            <p className="text-muted-foreground">{t(weather.toLowerCase().replace(' ', '_'))}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
