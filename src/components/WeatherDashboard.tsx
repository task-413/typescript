import { useState, useEffect, useCallback, useMemo } from 'react';
import { CitySearch } from './CitySearch';
import { CurrentWeather } from './CurrentWeather';
import { ForecastList } from './ForecastList';
import { AirQuality } from './AirQuality';
import { fetchGeocoding } from '../services/geocodingService';
import { fetchWeather } from '../services/weatherService';
import { fetchAirPollution } from '../services/airPollutionService';
import { getBackgroundColor } from '../utils/weatherBackground';
import type { WeatherResponse } from '../services/weatherService';
import type { AirPollutionResponse } from '../types/airPollution';

export function WeatherDashboard() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [airData, setAirData] = useState<AirPollutionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherData = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const geocodingResults = await fetchGeocoding(cityName);
      if (!geocodingResults || geocodingResults.length === 0) {
        throw new Error('Город не найден');
      }
      const { lat, lon, name, local_names } = geocodingResults[0];
      const displayName = local_names?.ru || name;
      setCity(displayName);
      const [weather, air] = await Promise.all([
        fetchWeather(lat, lon),
        fetchAirPollution(lat, lon),
      ]);
      setWeatherData(weather);
      setAirData(air);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      setWeatherData(null);
      setAirData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (city) {
        loadWeatherData(city);
      }
    }, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city, loadWeatherData]);

  const backgroundColor = useMemo(() => {
    if (!weatherData || !weatherData.list.length) return '#2c3e50';
    const weatherId = weatherData.list[0].weather[0].id;
    return getBackgroundColor(weatherId);
  }, [weatherData]);

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '20px auto',
        padding: '24px',
        backgroundColor,
        minHeight: 'calc(100vh - 40px)',
        transition: 'background-color 0.5s',
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: '20px' }}>Прогноз погоды</h1>
      <CitySearch onSearch={loadWeatherData} isLoading={isLoading} />

      {!weatherData && !isLoading && !error && (
        <CurrentWeather
          cityName=""
          weatherData={null}
          isLoading={false}
          error={null}
        />
      )}

      {isLoading && (
        <CurrentWeather
          cityName=""
          weatherData={null}
          isLoading={true}
          error={null}
        />
      )}

      {error && (
        <CurrentWeather
          cityName=""
          weatherData={null}
          isLoading={false}
          error={error}
        />
      )}

      {weatherData && !isLoading && !error && (
        <>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 300px', display: 'flex' }}>
              <CurrentWeather
                cityName={city}
                weatherData={weatherData}
                isLoading={false}
                error={null}
              />
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex' }}>
              <AirQuality
                airData={airData}
                isLoading={false}
                error={null}
              />
            </div>
          </div>
          <ForecastList
            forecasts={weatherData.list}
            isLoading={false}
            error={null}
          />
        </>
      )}
    </div>
  );
}