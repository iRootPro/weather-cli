import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv))
  .usage('Утилита для получения информации о текущей погоде в указанном городе')
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
