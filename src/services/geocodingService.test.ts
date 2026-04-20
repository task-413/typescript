import { describe, it, expect, vi, beforeEach } from 'vitest';

// Функция для динамического импорта сервиса после установки переменных окружения
async function importGeocodingService() {
  return import('./geocodingService');
}

describe('geocodingService', () => {
  beforeEach(() => {
    // Сбрасываем все моки и окружение
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('возвращает мок-данные при VITE_USE_MOCKS=true', async () => {
    // Устанавливаем переменную окружения
    vi.stubEnv('VITE_USE_MOCKS', 'true');

    const { fetchGeocoding } = await importGeocodingService();
    const result = await fetchGeocoding('Moscow');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Moscow');
    expect(result[0].lat).toBe(55.7558);
  });

  it('фильтрует мок по названию города', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');

    const { fetchGeocoding } = await importGeocodingService();
    const result = await fetchGeocoding('Mos');

    expect(result).toHaveLength(1);
  });

  it('возвращает пустой массив, если город не найден в моках', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');

    const { fetchGeocoding } = await importGeocodingService();
    const result = await fetchGeocoding('Лондон');

    expect(result).toHaveLength(0);
  });

  it.skip('делает реальный запрос при VITE_USE_MOCKS=false', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'false');
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key');
  });
});