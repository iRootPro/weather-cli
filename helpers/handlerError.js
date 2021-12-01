import { printError } from '../services/log.service.js';
export const handlerError = (error) => {
  if (error?.response?.status === 404) {
    printError('Неверно указан город');
  } else if (error?.response?.status === 401) {
    printError('Не верно указан токен');
  }
};
