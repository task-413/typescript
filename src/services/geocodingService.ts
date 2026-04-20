import { geocodingMock } from '../mocks/geocodingMock';

export interface GeocodingResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
export async function fetchGeocoding(cityName: string): Promise<GeocodingResult[]> {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  if (useMocks) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  return geocodingMock.filter((city) => {
    const searchLower = cityName.toLowerCase();
    if (city.name.toLowerCase().includes(searchLower)) return true;
    if (city.local_names) {
     return Object.values(city.local_names).some((localName) =>
        localName.toLowerCase().includes(searchLower)
    );
  }
  return false;
});
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status}`);
  }
  return response.json();
}