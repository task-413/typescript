import { render, screen } from '@testing-library/react';
import { ForecastList } from './ForecastList';
import type { WeatherForecast } from '../services/weatherService';
import { describe, it, expect } from 'vitest';

const mockForecasts: WeatherForecast[] = [
  {
    dt: 1713600000,
    main: {
      temp: 15.2,
      feels_like: 13.8,
      temp_min: 12.5,
      temp_max: 17.1,
      pressure: 1012,
      sea_level: 1015,
      grnd_level: 1008,
      humidity: 65,
      temp_kf: 0,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'ясно',
        icon: '01d',
      },
    ],
    clouds: { all: 0 },
    wind: { speed: 3.5, deg: 270, gust: 5.2 },
    visibility: 10000,
    pop: 0,
    sys: { pod: 'd' },
    dt_txt: '2024-04-20 12:00:00',
  },
  {
    dt: 1713610800,
    main: {
      temp: 16.0,
      feels_like: 14.5,
      temp_min: 13.0,
      temp_max: 18.0,
      pressure: 1010,
      sea_level: 1013,
      grnd_level: 1006,
      humidity: 60,
      temp_kf: 0,
    },
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'небольшая облачность',
        icon: '02d',
      },
    ],
    clouds: { all: 20 },
    wind: { speed: 4.0, deg: 260, gust: 6.0 },
    visibility: 10000,
    pop: 0.1,
    sys: { pod: 'd' },
    dt_txt: '2024-04-20 15:00:00',
  },
];

describe('ForecastList', () => {
  it('отображает индикатор загрузки', () => {
    render(<ForecastList forecasts={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Загрузка прогноза...')).toBeInTheDocument();
  });

  it('отображает ошибку', () => {
    render(<ForecastList forecasts={[]} isLoading={false} error="Ошибка сети" />);
    expect(screen.getByText('Ошибка загрузки прогноза: Ошибка сети')).toBeInTheDocument();
  });

  it('отображает сообщение при отсутствии данных', () => {
    render(<ForecastList forecasts={[]} isLoading={false} error={null} />);
    expect(screen.getByText('Нет данных прогноза')).toBeInTheDocument();
  });

  it('отображает список прогнозов', () => {
    render(<ForecastList forecasts={mockForecasts} isLoading={false} error={null} />);
    expect(screen.getByText('Прогноз на ближайшее время')).toBeInTheDocument();
    expect(screen.getAllByAltText(/ясно|небольшая облачность/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument();
  });
});