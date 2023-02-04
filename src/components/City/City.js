import React, { useContext } from 'react';
import Banner from '../../assets/image/banner.jpg';
import './City.scss';
import { AppContext } from '../../context/AppContext';
import { formatToLocalTime, iconUrlFromCode } from '../../services/WeatherService';

const City = () => {
    const { weather } = useContext(AppContext);
    return (
        <>
            {weather && (
                <div className="city">
                    <img className="city-image" src={iconUrlFromCode(weather.icon)} alt="" />
                    <h2 className="city-name">{weather.name}</h2>
                    <h2 className="city-temperature">{`${weather.temp.toFixed()}°C`}</h2>
                    <span className="city-time">{formatToLocalTime(weather.dt, weather.timezone)}</span>
                    <span className="city-cloud">{weather.description}</span>
                    <span className="city-cloud">{`Clouds: ${weather.clouds.all}%`}</span>
                    <div className="city-wrap-banner">
                        <img className="city-image-banner" src={Banner} alt="" />
                        <h2 className="city-title-banner">{weather.name}</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default City;
