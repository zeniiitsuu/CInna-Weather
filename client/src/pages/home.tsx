import { useState } from 'react';
import { motion } from 'framer-motion';
import WeatherCard from '@/components/weather/WeatherCard';
import SearchLocation from '@/components/weather/SearchLocation';
import CalendarView from '@/components/calendar/CalendarView';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [location, setLocation] = useState('Helsinki, Finland');

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <SearchLocation onLocationSelect={setLocation} />
          <WeatherCard location={location} />
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <CalendarView />
        </Card>
      </motion.div>
    </div>
  );
}
