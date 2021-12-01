import chalk from 'chalk';
import { getCurrentDate } from '../helpers/getCurrentDate.js';
import { convertTimeStamp } from '../helpers/convertTimeStamp.js';

export const outputCurrentWeather = (weather) => {
  console.log(`
      ${chalk.green('Погода на сегодня:')} ${getCurrentDate()}. Город: ${
    weather.name
  }
      ${chalk.bgWhite.black(
        ' ' + weather.weather[0].description.toUpperCase() +' ')} Температура: ${weather.main.temp}°C, ощущается как: ${
    weather.main.feels_like
  }°C. 
      Влажность: ${weather.main.humidity}%. Давление: ${weather.main.grnd_level}мм.рт.ст.
      🌅 Восход: ${convertTimeStamp(
        weather.sys.sunrise,
      )} 🌇 Заход: ${convertTimeStamp(weather.sys.sunset)}
    `);
};
