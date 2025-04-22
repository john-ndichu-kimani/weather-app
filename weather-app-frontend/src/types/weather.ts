export interface Coordinates {
    lat: number;
    lon: number;
    name: string;
    country: string | null;
  }
  
  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface CurrentWeather {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Weather[];
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
  }
  
  export interface ForecastDay {
    date: string;
    timestamp: number;
    temp: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
  }
  
  export interface WeatherData {
    coordinates: Coordinates;
    current: CurrentWeather;
    forecast: ForecastDay[];
  }
  
  export type Units = 'metric' | 'imperial';