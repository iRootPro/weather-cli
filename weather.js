#!/usr/bin/env node
import { args } from './services/args.service.js';
import { printError, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';
import { getCurrentWeather } from './services/api.service.js';
import { outputCurrentWeather } from './services/output.service.js';
import { exec } from 'child_process';

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
    await saveKeyValue('city', city);
    printSuccess('Город сохранен!');
  } catch (e) {
    printError('Ошибка при сохранении города');
  }
};

const getCurrentForcast = async () => {
  try {
    const response = await getCurrentWeather();
    outputCurrentWeather(response.data);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status === 401) {
      printError('Не верно указан токен');
    }
  }
};

const main = async () => {
  if (args.token) {
    await saveToken(args.token);
  }

  if (args.city) {
    await saveCity(args.city);
  }

  //clear console
  process.stdout.write('\u001b[2J\u001b[0;0H');
  await getCurrentForcast();
};

main();
