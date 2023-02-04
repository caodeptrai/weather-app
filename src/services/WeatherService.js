import { DateTime } from 'luxon';

const API_KEY = '1fa9ff4126d95b8db54f3897a208e91c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, units: 'metric', appid: API_KEY });

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        clouds,
        visibility,
    } = data;

    const { description, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        clouds,
        country,
        sunrise,
        sunset,
        description,
        icon,
        speed,
        visibility,
        pressure,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc,dd LLL'),
            temp: {
                day: d.temp.day,
                min: d.temp.min,
                max: d.temp.max,
            },
            icon: d.weather[0].icon,
            humidity: d.humidity,
            windSpeed: d.wind_speed,
            sunrise: d.sunrise,
            sunset: d.sunset,
            pressure: d.pressure,
            description: d.weather[0].description,
            uvi: d.uvi,
        };
    });

    hourly = hourly.slice(1, 25).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            feels_like: d.feels_like,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = 'cccc, hh:mm a') =>
    DateTime.fromSeconds(secs)
        .setZone(zone)
        .toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
