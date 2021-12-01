import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv))
  .usage('Утилита для получения информации о текущей погоде в указанном городе')
  .command('current', 'Получение текущей погоды')
  .command('hourly', 'Получение команды на несколько часов')
  .command('daily', 'Получение прогноза погоды на несколько дней')
  .help('help')
  .alias('h', 'help')
  .options({
    city: {
      alias: 'c',
      description: 'Установить город',
    },
    token: {
      alias: 't',
      description: 'Установить токен',
    },
  })
  .locale('ru')
  .epilog('Copyright 2021').argv;
