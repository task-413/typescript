import { describe, it, expect, vi, beforeEach } from 'vitest';

async function importWeatherService() {
  return import('./weatherService');
}

describe('weatherService', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('возвращает мок-данные при VITE_USE_MOCKS=true', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');

    const { fetchWeather } = await importWeatherService();
    const result = await fetchWeather(55.7558, 37.6173);

    expect(result.city.name).toBe('Moscow');
    expect(result.list).toHaveLength(1);
    expect(result.list[0].weather[0].main).toBe('Clear');
  });

  it.skip('делает реальный запрос при VITE_USE_MOCKS=false', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'false');
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key');
  });
});