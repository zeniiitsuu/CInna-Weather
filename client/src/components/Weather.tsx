import { motion } from "framer-motion";
import { WeatherData } from "@/lib/weather";
import { getRandomPhrase } from "@/lib/phrases";
import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog } from "lucide-react";

interface WeatherProps {
  data: WeatherData;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const icons = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Snow: CloudSnow,
    Thunderstorm: CloudLightning,
    Drizzle: CloudDrizzle,
    Mist: CloudFog,
  };

  const Icon = icons[condition as keyof typeof icons] || Cloud;
  return <Icon className="h-12 w-12 text-[#4cb5e8]" />;
};

export function Weather({ data }: WeatherProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#c1e7f5]/30">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="p-3 bg-sky-50 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WeatherIcon condition={data.condition} />
          </motion.div>
          <div>
            <motion.h2 
              className="text-4xl font-bold text-[#4cb5e8]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {data.temp}°C
            </motion.h2>
            <motion.p 
              className="text-[#4cb5e8]/80 capitalize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {data.description}
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-4 p-4 bg-sky-50 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-center text-lg font-medium text-[#4cb5e8]">
            {getRandomPhrase(data.condition)}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="bg-sky-50 p-3 rounded-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm text-[#4cb5e8]/70">Humidity</p>
            <p className="text-lg text-[#4cb5e8]">{data.humidity}%</p>
          </motion.div>
          <motion.div 
            className="bg-sky-50 p-3 rounded-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm text-[#4cb5e8]/70">Wind Speed</p>
            <p className="text-lg text-[#4cb5e8]">{data.windSpeed} m/s</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-[#4cb5e8] font-medium mb-3">Hourly Forecast</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {data.hourlyForecast.map((hour, index) => (
              <motion.div
                key={hour.time}
                className="bg-sky-50 p-3 rounded-lg min-w-[100px] text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <WeatherIcon condition={hour.condition} />
                <p className="text-sm text-[#4cb5e8]/70 mt-2">{hour.time}</p>
                <p className="text-lg font-medium text-[#4cb5e8]">{hour.temp}°C</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}