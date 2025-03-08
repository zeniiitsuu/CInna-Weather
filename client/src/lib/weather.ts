import axios from "axios";
import { WeatherCondition } from "@shared/schema";

const API_KEY = "30ff78246100b7a3cfebf19f9e07bd7c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export interface WeatherData {
  temp: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pressure: number;
  description: string;
  hourlyForecast: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: WeatherCondition;
}

export interface CityData {
  name: string;
  country: string;
  state?: string;
  lat?: number;
  lon?: number;
}

export async function searchCities(query: string): Promise<CityData[]> {
  if (query.length < 2) return [];

  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 10,
        appid: API_KEY
      }
    });

    return response.data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
}

async function getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
  const cities = await searchCities(city);
  if (cities.length === 0) {
    throw new Error("City not found");
  }
  const { lat, lon } = cities[0];
  if (!lat || !lon) {
    throw new Error("Coordinates not found");
  }
  return { lat, lon };
}

export async function getWeather(city: string): Promise<WeatherData> {
  try {
    const { lat, lon } = await getCoordinates(city);

    // Get current weather and hourly forecast
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric"
        }
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric"
        }
      })
    ]);

    // Process hourly forecast data (next 24 hours)
    const hourlyForecast = forecastResponse.data.list
      .slice(0, 8) // Get next 24 hours (3-hour intervals)
      .map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main as WeatherCondition
      }));

    return {
      temp: Math.round(currentResponse.data.main.temp),
      condition: currentResponse.data.weather[0].main as WeatherCondition,
      humidity: currentResponse.data.main.humidity,
      windSpeed: currentResponse.data.wind.speed,
      pressure: currentResponse.data.main.pressure,
      description: currentResponse.data.weather[0].description,
      hourlyForecast
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}