import React, { useContext, useState } from 'react';
import { Row, Col } from 'antd';
import './Week.scss';
import { AppContext } from '../../context/AppContext';
import { formatToLocalTime, iconUrlFromCode } from '../../services/WeatherService';
const Week = () => {
    const { weather } = useContext(AppContext);
    const [dataItem, setDataItem] = useState();

    return (
        <div>
            {weather && (
                <>
                    <Row gutter={[8, 8]}>
                        {weather.daily.map((data, index) => {
                            return (
                                <Col key={index} className="gutter-row" span={6} onClick={() => setDataItem(data)}>
                                    <div className="week-item-container">
                                        <h3 className="week-item-title">{data.title}</h3>
                                        <div className="week-item-content">
                                            <img className="icon-weather" src={iconUrlFromCode(weather.icon)} alt="" />
                                            <span className="week-item-data">{`${data.temp.day.toFixed()}°C`}</span>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                    <Row gutter={[4, 0]} className="week-info">
                        {!dataItem ? (
                            <>
                                <Col span={12} className="week-gutter-row">
                                    <div className="week-info-container">
                                        <span className="week-info-heading">{weather.daily[0].title}</span>
                                        <span className="week-info-item">{`Temp current: ${weather.daily[0].temp.day.toFixed()}°C`}</span>
                                        <span className="week-info-item">{`Temp:${weather.daily[0].temp.min.toFixed()}°C - ${weather.daily[0].temp.max.toFixed()}°C`}</span>
                                        <span className="week-info-item">{`Humidity:${weather.daily[0].humidity}%`}</span>
                                        <span className="week-info-item">{`Wind speed:${weather.daily[0].windSpeed}km/h`}</span>
                                    </div>
                                </Col>
                                <Col span={12} className="week-gutter-row">
                                    <div className="week-info-container">
                                        <span className="week-info-item week-info-mt2">{`Sunrise: ${formatToLocalTime(
                                            weather.daily[0].sunrise,
                                            weather.daily[0].timezone,
                                            'hh:mm a',
                                        )}`}</span>
                                        <span className="week-info-item">{`Sunset: ${formatToLocalTime(
                                            weather.daily[0].sunset,
                                            weather.daily[0].timezone,
                                            'hh:mm a',
                                        )}`}</span>
                                        <span className="week-info-item">
                                            {' '}
                                            {`Description: ${weather.daily[0].description}`}
                                        </span>
                                        <span className="week-info-item">{`Atmospheric pressure: ${weather.daily[0].pressure} hPa`}</span>
                                    </div>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col span={12} className="week-gutter-row">
                                    <div className="week-info-container">
                                        <span className="week-info-heading">{dataItem.title}</span>
                                        <span className="week-info-item">{`Temp current: ${dataItem.temp.day.toFixed()}°C`}</span>
                                        <span className="week-info-item">{`Temp:${dataItem.temp.min.toFixed()}°C - ${dataItem.temp.max.toFixed()}°C`}</span>
                                        <span className="week-info-item">{`Humidity:${dataItem.humidity}%`}</span>
                                        <span className="week-info-item">{`Wind speed:${dataItem.windSpeed}km/h`}</span>
                                    </div>
                                </Col>
                                <Col span={12} className="week-gutter-row">
                                    <div className="week-info-container">
                                        <span className="week-info-item week-info-mt2">{`Sunrise: ${formatToLocalTime(
                                            dataItem.sunrise,
                                            dataItem.timezone,
                                            'hh:mm a',
                                        )}`}</span>
                                        <span className="week-info-item">{`Sunset: ${formatToLocalTime(
                                            dataItem.sunset,
                                            dataItem.timezone,
                                            'hh:mm a',
                                        )}`}</span>
                                        <span className="week-info-item">
                                            {' '}
                                            {`Description: ${dataItem.description}`}
                                        </span>
                                        <span className="week-info-item">{`Atmospheric pressure: ${dataItem.pressure} hPa`}</span>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                </>
            )}
        </div>
    );
};

export default Week;
