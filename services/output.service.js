import chalk from 'chalk';
import { getCurrentDate } from '../helpers/getCurrentDate.js';
import {
  convertTimeStamp,
  convertTimeStampDate,
} from '../helpers/convertTimeStamp.js';
import Table from 'cli-table';
import dedent from 'dedent-js';

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
      Давление: ${Math.floor(weather.main.pressure * 0.75)} мм.рт.ст.
      Ветер: ${weather.wind.speed} м/с
      🌅 Восход: ${convertTimeStamp(
        weather.sys.sunrise,
      )} 🌇 Заход: ${convertTimeStamp(weather.sys.sunset)}
    `);
};

export const outputDailyWeather = (weather, city) => {
  const table = new Table({
    head: [
      'Дата',
      'Рассвет',
      'Закат',
      't° день',
      't° ночь',
      'Ветер',
      'Давление',
      'Влажность',
      'Погода',
    ],
    style: {
      compact: true,
    },
  });

  weather.daily.forEach((day) =>
    table.push([
      convertTimeStampDate(day.dt),
      convertTimeStamp(day.sunrise),
      convertTimeStamp(day.sunset),
      day.temp.day + ` (${day.temp.min} - ${day.temp.max})`,
      day.temp.night + ` (${day.temp.eve} - ${day.temp.morn})`,
      day.wind_speed + ' м/с',
      Math.floor(day.pressure * 0.75) + ' мм.рт.ст.',
      day.humidity + '%',
      day.weather[0].description,
    ]),
  );
  console.log(`Погода. ${city}`);
  console.log(table.toString());

  const alerts = weather.alerts.filter((alert) => alert.description.length > 0);
  if (alerts.length === 0) {
    return;
  }
  console.log('Внимание!');
  alerts.forEach((alert) => {
    console.log(
      dedent(`
          ${chalk.bgWhite.black(
            ` С ${convertTimeStampDate(alert.start)} ${convertTimeStamp(
              alert.start,
            )} по ${convertTimeStampDate(alert.end)} ${convertTimeStamp(
              alert.end,
            )} ${chalk.bgRed.black(` ${alert.event} `)} `,
          )} 
              ${alert.description}   
          `),
    );
  });
};

export const outputHourlyWeather = (weather, city) => {
  const table = new Table({
    head: ['Дата', 't°', 'Ветер', 'Давление', 'Влажность', 'Погода'],
    style: {
      compact: true,
    },
  });

  for (let i = 0; i < 12; i++) {
    let item = weather.hourly[i];
    table.push([
      convertTimeStamp(item.dt),
      item.temp + ` (${item.feels_like})`,
      item.wind_speed + ' м/с',
      Math.floor(item.pressure * 0.75) + ' мм.рт.ст.',
      item.humidity + '%',
      item.weather[0].description,
    ]);
  }
  console.log(`Погода. ${city}`);
  console.log(table.toString());
};
