import type { AirPollutionResponse } from '../types/airPollution';

export const airPollutionMock: AirPollutionResponse = {
  coord: {
    lon: 37.6173,
    lat: 55.7558,
  },
  list: [
    {
      main: {
        aqi: 2,
      },
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