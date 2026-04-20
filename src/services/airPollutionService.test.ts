import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAirPollution } from './airPollutionService';

describe('airPollutionService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('возвращает мок-данные при VITE_USE_MOCKS=true', async () => {
    const result = await fetchAirPollution(55.7558, 37.6173);
    expect(result.list[0].main.aqi).toBe(2);
    expect(result.list[0].components.pm2_5).toBe(5.2);
  });

  it.skip('делает реальный запрос при VITE_USE_MOCKS=false', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'false');
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key');
    // Здесь будет тест с моком fetch
  });
});