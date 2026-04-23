"use client";

import DashboardPage from '@/components/dashboard/DashboardPage';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
    const { t } = useLanguage();
    
  return (
    <div className="flex flex-col gap-6">
        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
            {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <h1 className="font-headline text-4xl font-bold text-white">{t('welcome_title')}</h1>
                <p className="mt-2 text-lg text-gray-200">{t('welcome_subtitle')}</p>
            </div>
        </div>
      <DashboardPage />
    </div>
  );
}
