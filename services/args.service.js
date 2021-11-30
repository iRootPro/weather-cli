import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const args = yargs(hideBin(process.argv))
  .usage('Использование: $0 <команда> [options]')
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
  .epilog('Copyright 2021').argv;
