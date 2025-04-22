<?php

namespace App\Services;

use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    protected $client;
    protected $apiKey;
    protected $apiUrl;
    protected $geoApiUrl;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => false 
        ]);

        $this->client = new Client();
        $this->apiKey = env('OPENWEATHERMAP_API_KEY');
        $this->apiUrl = env('OPENWEATHERMAP_API_URL', 'https://api.openweathermap.org/data/2.5');
        $this->geoApiUrl = env('OPENWEATHERMAP_GEO_API_URL', 'https://api.openweathermap.org/geo/1.0');

        // Log configuration for debugging
        Log::debug('Weather Service Configuration:', [
            'apiUrl' => $this->apiUrl,
            'geoApiUrl' => $this->geoApiUrl,
            'apiKeySet' => !empty($this->apiKey)
        ]);
    }

    /**
     * Get coordinates for a city name using Geocoding API
     *
     * @param string $cityName
     * @return array|null
     */
    public function getCoordinates(string $cityName)
    {
        try {
            Log::debug("Fetching coordinates for city: {$cityName}");

            $response = $this->client->get("{$this->geoApiUrl}/direct", [
                'query' => [
                    'q' => $cityName,
                    'limit' => 1,
                    'appid' => $this->apiKey
                ]
            ]);

            $data = json_decode($response->getBody(), true);
            Log::debug("Geocoding API response:", ['data' => $data]);

            if (empty($data)) {
                Log::warning("Empty response from geocoding API for city: {$cityName}");
                return null;
            }

            if (!isset($data[0])) {
                Log::warning("No location found for city: {$cityName}");
                return null;
            }

            return [
                'lat' => $data[0]['lat'],
                'lon' => $data[0]['lon'],
                'name' => $data[0]['name'],
                'country' => $data[0]['country'] ?? null,
            ];
        } catch (Exception $e) {
            Log::error("Error fetching coordinates: {$e->getMessage()}", [
                'city' => $cityName,
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    /**
     * Alternative method to directly get weather by city name
     * Use this as a fallback if coordinates lookup fails
     *
     * @param string $cityName
     * @param string $units
     * @return array|null
     */
    public function getWeatherByCity(string $cityName, string $units = 'metric')
    {
        try {
            Log::debug("Fetching weather directly for city: {$cityName}");

            $response = $this->client->get("{$this->apiUrl}/weather", [
                'query' => [
                    'q' => $cityName,
                    'units' => $units,
                    'appid' => $this->apiKey
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            if (isset($data['cod']) && $data['cod'] != 200) {
                Log::warning("Weather API error for city {$cityName}: {$data['message']}");
                return null;
            }

            return $data;
        } catch (Exception $e) {
            Log::error("Error fetching weather by city: {$e->getMessage()}", [
                'city' => $cityName
            ]);
            return null;
        }
    }

    /**
     * Get current weather data for coordinates
     *
     * @param float $lat
     * @param float $lon
     * @param string $units
     * @return array|null
     */
    public function getCurrentWeather(float $lat, float $lon, string $units = 'metric')
    {
        try {
            $response = $this->client->get("{$this->apiUrl}/weather", [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'units' => $units,
                    'appid' => $this->apiKey
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            if (isset($data['cod']) && $data['cod'] != 200) {
                Log::warning("Weather API error for coordinates {$lat},{$lon}: {$data['message']}");
                return null;
            }

            return $data;
        } catch (Exception $e) {
            Log::error("Error fetching current weather: {$e->getMessage()}", [
                'lat' => $lat,
                'lon' => $lon
            ]);
            return null;
        }
    }

    /**
     * Get forecast data for coordinates (3 days)
     *
     * @param float $lat
     * @param float $lon
     * @param string $units
     * @return array|null
     */
    public function getForecast(float $lat, float $lon, string $units = 'metric')
    {
        try {
            $response = $this->client->get("{$this->apiUrl}/forecast", [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'units' => $units,
                    'appid' => $this->apiKey
                ]
            ]);

            $forecastData = json_decode($response->getBody(), true);

            if (isset($forecastData['cod']) && $forecastData['cod'] != '200') {
                Log::warning("Forecast API error for coordinates {$lat},{$lon}: {$forecastData['message']}");
                return null;
            }

            // Process the forecast data to get the next 3 days
            return $this->processForecastData($forecastData);
        } catch (Exception $e) {
            Log::error("Error fetching forecast: {$e->getMessage()}", [
                'lat' => $lat,
                'lon' => $lon
            ]);
            return null;
        }
    }

    /**
     * Process forecast data to get daily forecasts
     *
     * @param array $forecastData
     * @return array
     */
    private function processForecastData(array $forecastData)
    {
        $dailyForecasts = [];
        $currentDate = date('Y-m-d');
        $daysProcessed = 0;
        $maxDays = 3;

        foreach ($forecastData['list'] as $forecast) {
            $forecastDate = date('Y-m-d', $forecast['dt']);

            // Skip current day
            if ($forecastDate === $currentDate) {
                continue;
            }

            // If we haven't processed this day yet
            if (!isset($dailyForecasts[$forecastDate]) && $daysProcessed < $maxDays) {
                $dailyForecasts[$forecastDate] = [
                    'date' => $forecastDate,
                    'timestamp' => $forecast['dt'],
                    'temp' => $forecast['main']['temp'],
                    'description' => $forecast['weather'][0]['description'],
                    'icon' => $forecast['weather'][0]['icon'],
                    'humidity' => $forecast['main']['humidity'],
                    'wind_speed' => $forecast['wind']['speed'],
                ];
                $daysProcessed++;
            }

            // Stop once we have 3 days
            if ($daysProcessed >= $maxDays) {
                break;
            }
        }

        return array_values($dailyForecasts);
    }

    /**
     * Get all weather data including current and forecast
     *
     * @param string $cityName
     * @param string $units
     * @return array|null
     */
    public function getAllWeatherData(string $cityName, string $units = 'metric')
    {
        $coordinates = $this->getCoordinates($cityName);

        if (!$coordinates) {
            // Try direct weather lookup as fallback
            $directWeather = $this->getWeatherByCity($cityName, $units);

            if (!$directWeather) {
                return null;
            }

            // Extract coordinates from direct weather response
            $coordinates = [
                'lat' => $directWeather['coord']['lat'],
                'lon' => $directWeather['coord']['lon'],
                'name' => $directWeather['name'],
                'country' => $directWeather['sys']['country'] ?? null,
            ];

            $currentWeather = $directWeather;
        } else {
            $currentWeather = $this->getCurrentWeather($coordinates['lat'], $coordinates['lon'], $units);

            if (!$currentWeather) {
                return null;
            }
        }

        $forecast = $this->getForecast($coordinates['lat'], $coordinates['lon'], $units);

        return [
            'coordinates' => $coordinates,
            'current' => $currentWeather,
            'forecast' => $forecast
        ];
    }
}
