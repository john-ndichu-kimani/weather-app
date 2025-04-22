import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchWeatherByCity } from '../services/api';
import { WeatherData, Units } from '../types/weather';
import CitySearch from '@/app/components/CitySearch';
import UnitToggle from '@/app/components/UnitToggle';
import CurrentWeather from '@/app/components/CurrentWeather';
import Forecast from '@/app/components/Forecast';
import '../styles/globals.css';
import WeatherDetails from '@/app/components/WeatherDetails';


export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [city, setCity] = useState<string>('London'); 

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
    await fetchWeather(searchCity);
  };

  const handleUnitToggle = async (newUnits: Units) => {
    setUnits(newUnits);
    if (city) {
      await fetchWeather(city, newUnits);
    }
  };

  const fetchWeather = async (cityName: string, unitType: Units = units) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(cityName, unitType);
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather for default city on component mount
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather App</h1>
        
        <CitySearch onSearch={handleSearch} />
        
        {loading && (
          <div className="flex justify-center my-8">
            <div className="spinner-dot-pulse">
              <div className="spinner-pulse-dot"></div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="alert alert-error mb-6">{error}</div>
        )}
        
        {weatherData && !loading && (
          <>
            <UnitToggle units={units} onToggle={handleUnitToggle} />
            
            <CurrentWeather data={weatherData.current} units={units} />
            
            <div className="mt-8">
              <Forecast data={weatherData.forecast} units={units} />
            </div>
            
            <div className="mt-8">
              <WeatherDetails data={weatherData.current} units={units} />
            </div>
          </>
        )}
      </main>
      
    </>
  );
}