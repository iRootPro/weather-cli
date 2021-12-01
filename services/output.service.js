import chalk from 'chalk';
import { getCurrentDate } from '../helpers/getCurrentDate.js';
import { convertTimeStamp } from '../helpers/convertTimeStamp.js';

export const outputCurrentWeather = (weather) => {
  console.log(`
      ${chalk.green('Погода на сегодня:')} ${getCurrentDate()}. Город: ${
    weather.name
  }
      ${chalk.bgWhite.black(
        ' ' + weather.weather[0].description.toUpperCase() + ' ',
      )} 
      Температура: ${weather.main.temp}°C, ощущается как: ${
    weather.main.feels_like
  }°C. 
      Влажность: ${weather.main.humidity}% 
      Давление: ${Math.floor(
    weather.main.pressure * 0.75,
  )} мм.рт.ст.
      Ветер: ${weather.wind.speed} м/с
      🌅 Восход: ${convertTimeStamp(
        weather.sys.sunrise,
      )} 🌇 Заход: ${convertTimeStamp(weather.sys.sunset)}
    `);
};
