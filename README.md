# Получение погоды через CLI

Простое CLI приложение для получения погоды из источника: https://openweathermap.org/

### Настройка и использование

**_Установка_**

_Локально_

```shell
git clone git@github.com:iRootPro/weather-cli.git
npm i
```

_Глобально_

```shell
npm i -g simple-weather-cli
```

**_Получение справки_**

```shell
node weather.js -h
```

**_Настройка_**
Для начала необходимо получить API TOKEN на сайте [openweathermap](https://openweathermap.org/api). Для этого необходимо зарегистрироваться, выбрать тариф Free.

Перед тем, как получать сведения о погоде следует установить полученный токен и указать город.

1. Установка token:

```shell
node weather.js -t fdsfdf54534gdfgd4
```

2. Установка города:

```shell
node weather.js -c Moscow
```

Если всё прошло нормально, вы получите уведомление, что город и токен сохранены.
Файл с настройками будет находиться в домашней директории пользователя с именем: `.weather.json`

**Использование**
Чтобы получить погоду следует выполнить команду:

Вывод текущей погоды:

```
node weather.js
```

![Погода в данный момент](/images/output_current.png)

Вывод погоды на 12 часов:

```shell
node weather hourly
```

![Погода в ближайшие 12 часов](/images/output_hourly.png)


Вывод погоды на 8 дней вместе с предупреждениями:

```shell
node weather.js daily
```

![Погода на 8 дней](/images/output_daily.png)
