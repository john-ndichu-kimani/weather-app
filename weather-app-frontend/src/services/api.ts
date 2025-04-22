import { WeatherData, Units } from '../types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const fetchWeatherByCity = async (city: string, units: Units = 'metric'): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}&units=${units}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const searchCities = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cities/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search cities');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};