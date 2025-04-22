import React from 'react';
import dayjs from 'dayjs';
import WeatherIcon from './WeatherIcon';
import { CurrentWeather as CurrentWeatherType } from '../../types/weather';
import '../../styles/globals.css'

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  units: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const formattedDate = dayjs(data.dt * 1000).format('dddd, MMMM D, YYYY');
  
  return (
    <div className="card bg-white shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <WeatherIcon icon={data.weather[0].icon} size={80} />
          <div className="ml-4">
            <div className="text-5xl font-bold">{Math.round(data.main.temp)}{tempUnit}</div>
            <p className="text-lg capitalize">{data.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;