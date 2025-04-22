<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/weather', [WeatherController::class, 'getWeatherByCity']);
Route::get('/cities/search', [WeatherController::class, 'searchCities']);

// A simple health check endpoint
Route::get('/health', function () {
    return response()->json(['status' => 'OK']);
});
