import { weatherMock } from '../mocks/weatherMock';

export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  if (useMocks) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return weatherMock;
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  return response.json();
}