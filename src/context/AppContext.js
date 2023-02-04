import React, { useEffect, useState } from 'react';
import getFormattedWeatherData from '../services/WeatherService';

export const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [query, setQuery] = useState({ q: 'ha noi' });
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query }).then((data) => {
                setWeather(data);
            });
        };

        fetchWeather();
    }, [query]);

    return <AppContext.Provider value={{ query, setQuery, weather }}>{children}</AppContext.Provider>;
};

export default AppProvider;
