import type { AirPollutionResponse } from '../types/airPollution';

interface AirQualityProps {
  airData: AirPollutionResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

const AQI_LEVELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Хорошо', color: '#00e400' },
  2: { label: 'Удовлетворительно', color: '#ffff00' },
  3: { label: 'Умеренно', color: '#ff7e00' },
  4: { label: 'Плохо', color: '#ff0000' },
  5: { label: 'Очень плохо', color: '#99004d' },
};

export function AirQuality({ airData, isLoading, error }: AirQualityProps) {
  if (isLoading) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Загрузка данных о качестве воздуха...</div>;
  }

  if (error) {
    return <div style={{ color: '#ffcccc', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Ошибка: {error}</div>;
  }

  if (!airData || !airData.list || airData.list.length === 0) {
    return <div style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Нет данных о качестве воздуха</div>;
  }

  const current = airData.list[0];
  const { aqi } = current.main;
  const { components } = current;
  const aqiInfo = AQI_LEVELS[aqi] || { label: 'Неизвестно', color: '#999' };

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
      <h3 style={{ marginTop: 0 }}>Качество воздуха</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: aqiInfo.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: aqi === 2 ? '#000' : '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {aqi}
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Индекс AQI: {aqi}</div>
          <div style={{ color: aqiInfo.color, fontWeight: 'bold', textShadow: '0 0 4px rgba(0,0,0,0.5)' }}>
            {aqiInfo.label}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        <div>PM2.5: {components.pm2_5} µg/m³</div>
        <div>PM10: {components.pm10} µg/m³</div>
        <div>CO: {components.co} µg/m³</div>
        <div>NO₂: {components.no2} µg/m³</div>
        <div>O₃: {components.o3} µg/m³</div>
        <div>SO₂: {components.so2} µg/m³</div>
      </div>
    </div>
  );
}