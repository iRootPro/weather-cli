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

export const getCoordCity = async (city) => {
  const config = await getKeysValues();
  return await instance.get('weather', {
    params: {
      q: city,
      appid: config.token,
    },
  });
};

export const getDailyWeather = async () => {
  const config = await getKeysValues();
  return await instance.get('onecall', {
    params: {
      lat: config.lat,
      lon: config.lon,
      appid: config.token,
      exclude: 'current,minutely,hourly',
    },
  });
};

export const getHourlyWeather = async () => {
  const config = await getKeysValues();
  return await instance.get('onecall', {
    params: {
      lat: config.lat,
      lon: config.lon,
      appid: config.token,
      exclude: 'current,minutely,daily,alerts',
    },
  });
};
