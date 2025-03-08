import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import WeatherInfo from './WeatherInfo';
import WeatherPhrases from './WeatherPhrases';
import { Card, CardContent } from '@/components/ui/card';
import { getWeatherData } from '@/lib/weather';

interface WeatherCardProps {
  location: string;
}

export default function WeatherCard({ location }: WeatherCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', location],
    queryFn: () => getWeatherData(location)
  });

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="h-48" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="text-red-500">
          Failed to load weather data
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="space-y-4"
    >
      <WeatherInfo data={data} />
      <WeatherPhrases weather={data.weather[0].main.toLowerCase()} />
    </motion.div>
  );
}
