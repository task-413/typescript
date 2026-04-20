import type { WeatherForecast } from '../services/weatherService';
import { WeatherIcon } from './WeatherIcon';

interface ForecastListProps {
  forecasts: WeatherForecast[];
  isLoading?: boolean;
  error?: string | null;
}

export function ForecastList({ forecasts, isLoading, error }: ForecastListProps) {
  if (isLoading) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Загрузка прогноза...</div>;
  }

  if (error) {
    return <div style={{ color: '#ffcccc', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Ошибка загрузки прогноза: {error}</div>;
  }

  if (!forecasts || forecasts.length === 0) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Нет данных прогноза</div>;
  }

  const formatDate = (dt_txt: string) => {
    const date = new Date(dt_txt.replace(' ', 'T'));
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Прогноз на ближайшее время</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {forecasts.slice(0, 8).map((item) => (
          <div
            key={item.dt}
            style={{
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '12px',
              minWidth: '120px',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(5px)',
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            <div>{formatDate(item.dt_txt)}</div>
            <WeatherIcon iconCode={item.weather[0].icon} altText={item.weather[0].description} />
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{Math.round(item.main.temp)}°C</div>
            <div style={{ fontSize: '12px', textTransform: 'capitalize' }}>{item.weather[0].description}</div>
            <div style={{ fontSize: '12px' }}>💧 {item.main.humidity}%</div>
            <div style={{ fontSize: '12px' }}>💨 {item.wind.speed} м/с</div>
          </div>
        ))}
      </div>
    </div>
  );
}