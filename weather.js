#!/usr/bin/env node
import { args } from './services/args.service.js';
import { printError, printSuccess } from './services/log.service.js';
import { getKeysValues, saveKeyValue } from './services/storage.service.js';
import {
  getCoordCity,
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
} from './services/api.service.js';
import {
  outputCurrentWeather,
  outputDailyWeather,
  outputHourlyWeather,
} from './services/output.service.js';
import { COMMAND_NAME } from './constatns.js';
import { handlerError } from './helpers/handlerError.js';

const command = args._[0];
const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен, для получения помощи введите ключ -h');
    return;
  }
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен сохранен!');
  } catch (e) {
    printError(`Ошибка при сохранении токена, ${e.message}`);
  }
};

const saveCity = async (city) => {
  try {
    const config = await getKeysValues();
    if (!config.token) {
      printError('Сначала установите токен с помощью -t [TOKEN]');
      return;
    }
    const response = await getCoordCity(city);
    await saveKeyValue('lat', response?.data?.coord?.lat);
    await saveKeyValue('lon', response?.data?.coord?.lon);
    await saveKeyValue('city', city);
    printSuccess('Город сохранен!');
  } catch (e) {
    printError(
      `Ошибка при сохранении города. Возможно вы не указали токен или допустили ошибку в написании города`,
    );
  }
};

const getCurrentForecast = async () => {
  try {
    const response = await getCurrentWeather();
    outputCurrentWeather(response.data);
  } catch (e) {
    handlerError(e);
  }
};

const getDailyForecast = async () => {
  try {
    const config = await getKeysValues();

    const response = await getDailyWeather();
    outputDailyWeather(response.data, config.city);
  } catch (e) {
    handlerError(e);
  }
};

const getHourlyForecast = async () => {
  try {
    const config = await getKeysValues();

    const response = await getHourlyWeather();
    outputHourlyWeather(response.data, config.city);
  } catch (e) {
    handlerError(e);
  }
};

const main = async () => {
  if (args.token) {
    return await saveToken(args.token);
  }

  if (args.city) {
    return await saveCity(args.city);
  }

  process.stdout.write('\u001b[2J\u001b[0;0H');

  if (command === COMMAND_NAME.hourly) {
    await getHourlyForecast();
    return;
  }

  if (command === COMMAND_NAME.daily) {
    await getDailyForecast();
    return;
  }

  // current weather
  await getCurrentForecast();
};

main();
