import type { CropRecommendationOutput } from '@/ai/flows/crop-recommendation-engine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, FlaskConical, ShieldCheck, HandCoins, Bug, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type RecommendationResultProps = {
    result: CropRecommendationOutput;
};

export default function RecommendationResult({ result }: RecommendationResultProps) {
    const { t } = useLanguage();
    return (
        <Card className="shadow-lg animate-in fade-in-50">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardDescription>{t('our_recommendation')}</CardDescription>
                        <CardTitle className="font-headline text-3xl text-primary">{result.recommendedCrop}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-accent/50 text-accent-foreground">{result.predictedDisease}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                        icon={Droplets}
                        title={t('water_needed')}
                        value={result.waterNeeded}
                        description={t('liters_per_hectare')}
                    />
                    <InfoCard
                        icon={FlaskConical}
                        title={t('fertilizer')}
                        value={result.fertilizerRecommendation}
                        description={t('recommended_type')}
                    />
                </div>
                <TitledInfoSection icon={ShieldCheck} title={t('crop_protection_tips')} content={result.cropProtectionTips} />
                <TitledInfoSection icon={HandCoins} title={t('limited_resources_tips')} content={result.limitedResourcesTips} />
                <TitledInfoSection icon={Bug} title={t('predicted_disease')} content={result.predictedDisease} />
                <TitledInfoSection icon={CheckCircle} title={t('disease_prevention_tips')} content={result.diseasePreventionTips} />
            </CardContent>
        </Card>
    );
}

function InfoCard({ icon: Icon, title, value, description }: { icon: React.ElementType, title: string, value: string, description: string }) {
    return (
        <Card className="bg-background/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

function TitledInfoSection({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-muted-foreground">{content}</p>
        </div>
    )
}
