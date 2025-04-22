import React from 'react';
import dayjs from 'dayjs';
import WeatherIcon from './WeatherIcon';
import { ForecastDay } from '../../types/weather';
import '../../styles/globals.css'

interface ForecastProps {
  data: ForecastDay[];
  units: 'metric' | 'imperial';
}

const Forecast: React.FC<ForecastProps> = ({ data, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((day, index) => (
          <div key={index} className="card bg-white shadow-sm p-4">
            <div className="flex flex-col items-center">
              <div className="font-bold text-lg">
                {dayjs(day.timestamp * 1000).format('ddd, MMM D')}
              </div>
              <WeatherIcon icon={day.icon} size={48} />
              <div className="text-2xl font-bold mt-2">
                {Math.round(day.temp)}{tempUnit}
              </div>
              <div className="text-gray-600 capitalize">{day.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;