<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get weather data for a city
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getWeatherByCity(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        $weatherData = $this->weatherService->getAllWeatherData($city, $units);

        if (!$weatherData) {
            return response()->json(['error' => 'Unable to fetch weather data for the specified city'], 404);
        }

        return response()->json($weatherData);
    }

    /**
     * Search for cities by name (geocoding)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchCities(Request $request)
    {
        $query = $request->query('query');

        if (!$query) {
            return response()->json(['error' => 'Query parameter is required'], 400);
        }

        $coordinates = $this->weatherService->getCoordinates($query);

        if (!$coordinates) {
            return response()->json(['error' => 'No results found'], 404);
        }

        return response()->json($coordinates);
    }
}
