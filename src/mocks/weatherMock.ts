import type { WeatherResponse } from '../services/weatherService';
export const weatherMock: WeatherResponse = {
  cod: '200',
  message: 0,
  cnt: 1,
  list: [
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
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 3.5,
        deg: 270,
        gust: 5.2,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: '2024-04-20 12:00:00',
    },
  ],
  city: {
    id: 524901,
    name: 'Moscow',
    coord: {
      lat: 55.7558,
      lon: 37.6173,
    },
    country: 'RU',
    population: 12655000,
    timezone: 10800,
    sunrise: 1713571200,
    sunset: 1713621600,
  },
};