import { render, screen } from '@testing-library/react';
import { AirQuality } from './AirQuality';
import type { AirPollutionResponse } from '../types/airPollution';
import { describe, it, expect } from 'vitest';

const mockAirData: AirPollutionResponse = {
  coord: { lon: 37.6173, lat: 55.7558 },
  list: [
    {
      main: { aqi: 2 },
      components: {
        co: 201.94,
        no: 0.02,
        no2: 0.77,
        o3: 85.12,
        so2: 0.64,
        pm2_5: 5.2,
        pm10: 5.8,
        nh3: 0.28,
      },
      dt: 1713600000,
    },
  ],
};

describe('AirQuality', () => {
  it('отображает индикатор загрузки', () => {
    render(<AirQuality airData={null} isLoading={true} error={null} />);
    expect(screen.getByText('Загрузка данных о качестве воздуха...')).toBeInTheDocument();
  });

  it('отображает ошибку', () => {
    render(<AirQuality airData={null} isLoading={false} error="Ошибка получения данных" />);
    expect(screen.getByText('Ошибка: Ошибка получения данных')).toBeInTheDocument();
  });

  it('отображает сообщение при отсутствии данных', () => {
    render(<AirQuality airData={null} isLoading={false} error={null} />);
    expect(screen.getByText('Нет данных о качестве воздуха')).toBeInTheDocument();
  });

  it('отображает данные о качестве воздуха', () => {
    render(<AirQuality airData={mockAirData} isLoading={false} error={null} />);
    expect(screen.getByText('Качество воздуха')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Удовлетворительно')).toBeInTheDocument();
    expect(screen.getByText('PM2.5: 5.2 µg/m³')).toBeInTheDocument();
    expect(screen.getByText('PM10: 5.8 µg/m³')).toBeInTheDocument();
  });
});