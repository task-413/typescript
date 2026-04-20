import type { AirPollutionResponse } from '../types/airPollution';
import { airPollutionMock } from '../mocks/airPollutionMock';

export async function fetchAirPollution(lat: number, lon: number): Promise<AirPollutionResponse> {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  if (useMocks) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return airPollutionMock;
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Air Pollution API error: ${response.status}`);
  }
  return response.json();
}