import axios from 'axios';
import { getKeysValues } from './storage.service.js';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  withCredentials: true,
  params: {
    units: 'metric',
    lang: 'ru',
  },
});

export const getCurrentWeather = async () => {
  const config = await getKeysValues();
  if (!config.token) {
    throw new Error(
      'Не задан ключ API, задайте его через команду: -t [API_KEY_TOKEN]',
    );
  }
  return await instance.get('weather', {
    params: {
      q: process.env.CITY || config.city,
      appid: process.env.TOKEN || config.token,
    },
  });
};

// export const getForecastWeather = async (city) => {
//   const token = await getKeyValue(PARAMS_DICTIONARY.token);
//   return instance.get('forecast/hourly', {
//     params: {
//       q: city,
//       appid: token,
//     },
//   });
// };
