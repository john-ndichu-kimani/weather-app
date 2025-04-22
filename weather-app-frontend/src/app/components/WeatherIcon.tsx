import React from 'react';
import Image from 'next/image';
import '../../styles/globals.css'

interface WeatherIconProps {
  icon: string;
  size?: number;
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size = 64, alt = 'Weather icon' }) => {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      width={size}
      height={size}
      alt={alt}
      className="weather-icon"
    />
  );
};

export default WeatherIcon;