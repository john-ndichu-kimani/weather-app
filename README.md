# Weather App

A weather application built with Next.js frontend and Laravel backend.
[Weather App Main Screen]
<img width="960" alt="Image" src="https://github.com/user-attachments/assets/04532618-7f33-4c8f-85da-ab73a6f3e1cd" />

## Features

* City weather search
* Toggle between °C and °F
* Current weather display
* 3-day forecast
* Wind and humidity information
[Search by City]
<img width="960" alt="Image" src="https://github.com/user-attachments/assets/444510ae-ec3f-4b79-b1b9-f1c349022aa0" />

## Getting Started

### Backend Setup

```bash
cd weather-app-backend
npm install
php artisan serve
```

Backend runs at: http://127.0.0.1:8000

### Frontend Setup

```bash
cd weather-app-frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

## API Endpoints

* `GET: http://127.0.0.1:8000/api/weather` - Get weather data
* `GET: http://127.0.0.1:8000/api/cities/search` - Search cities
