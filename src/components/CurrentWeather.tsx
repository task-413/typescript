import type { WeatherResponse } from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  cityName: string;
  weatherData: WeatherResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

export function CurrentWeather({ cityName, weatherData, isLoading, error }: CurrentWeatherProps) {
  if (isLoading) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Загрузка погоды...</div>;
  }

  if (error) {
    return <div style={{ color: '#ffcccc', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Ошибка: {error}</div>;
  }

  if (!weatherData) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Введите город для просмотра погоды</div>;
  }

  const current = weatherData.list[0];
  const { main, weather, wind } = current;
  const iconCode = weather[0].icon;
  const description = weather[0].description;

  return (
    <div
      style={{
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(5px)',
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ marginTop: 0 }}>{cityName}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <WeatherIcon iconCode={iconCode} altText={description} />
        <div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{Math.round(main.temp)}°C</div>
          <div>Ощущается как {Math.round(main.feels_like)}°C</div>
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <div>💧 Влажность: {main.humidity}%</div>
        <div>💨 Ветер: {wind.speed} м/с</div>
        <div style={{ textTransform: 'capitalize' }}>☁️ {description}</div>
      </div>
    </div>
  );
}