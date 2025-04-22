import React from 'react';
import { CurrentWeather } from '../../types/weather';
import '../../styles/globals.css'

interface WeatherDetailsProps {
  data: CurrentWeather;
  units: 'metric' | 'imperial';
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, units }) => {
  const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph';
  
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">Weather Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-white shadow-sm p-4">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div>
              <div className="text-gray-600">Wind Status</div>
              <div className="text-2xl font-bold">{data.wind.speed} {windSpeedUnit}</div>
            </div>
          </div>
        </div>
        
        <div className="card bg-white shadow-sm p-4">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <div className="text-gray-600">Humidity</div>
              <div className="text-2xl font-bold">{data.main.humidity}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;