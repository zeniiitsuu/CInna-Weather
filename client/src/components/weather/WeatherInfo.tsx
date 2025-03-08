import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const weatherIcons = {
  clear: Sun,
  clouds: Cloud,
  rain: CloudRain,
  snow: CloudSnow,
  thunderstorm: CloudLightning,
};

export default function WeatherInfo({ data }: { data: any }) {
  const WeatherIcon = weatherIcons[data.weather[0].main.toLowerCase()] || Cloud;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <WeatherIcon className="w-16 h-16 text-primary" />
        </motion.div>
        <div>
          <h2 className="text-4xl font-bold">{Math.round(data.main.temp)}°C</h2>
          <p className="text-muted-foreground">{data.weather[0].description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Humidity</p>
          <p className="text-xl">{data.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Wind</p>
          <p className="text-xl">{Math.round(data.wind.speed)} m/s</p>
        </div>
      </div>
    </div>
  );
}
