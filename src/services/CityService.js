export const CITY_API_URL = 'http://api.openweathermap.org/geo/1.0';

export const getCity = (value) => {
    return fetch(
        `${CITY_API_URL}/direct?q=${value},VN&limit=4&appid=1fa9ff4126d95b8db54f3897a208e91c`,
    ).then((response) => response.json());
};
