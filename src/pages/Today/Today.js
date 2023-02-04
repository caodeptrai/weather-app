import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';
import './Today.scss';
import { AppContext } from '../../context/AppContext';
import { formatToLocalTime } from '../../services/WeatherService';
import Sunrise from '../../assets/image/sunrise.png';
import Sunset from '../../assets/image/sunset.png';
import Humidity from '../../assets/image/humidity.png';
import Visibility from '../../assets/image/vision.png';
import UVIndex from '../../assets/image/uv-index.png';

const Today = () => {
    const { weather } = useContext(AppContext);

    const formatVisibility = (visibility) => {
        const visi = Number(visibility);
        const kq = visi / 1000;
        return kq;
    };
    return (
        <div>
            {weather && (
                <Row gutter={[24, 24]}>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">UV index</h3>
                            <div className="item-content">
                                <img style={{ width: 48 }} src={UVIndex} alt="" />
                                <span className="item-data">{weather.daily[0].uvi}</span>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">Wind Status</h3>
                            <div className="item-content">
                                <FontAwesomeIcon className="icon-blue" icon={faWind} />
                                <span className="item-data">{`${weather.speed}km/h`}</span>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">Sunrise & Sunset</h3>
                            <div className="item-content-sunset">
                                <img style={{ width: 48 }} src={Sunrise} alt="" />
                                <span className="item-data item-data-sunset">
                                    {formatToLocalTime(weather.sunrise, weather.timezone, 'hh:mm a')}
                                </span>
                            </div>
                            <div className="item-content-sunset">
                                <img style={{ width: 48 }} src={Sunset} alt="" />

                                <span className="item-data item-data-sunset">
                                    {formatToLocalTime(weather.sunset, weather.timezone, 'hh:mm a')}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">Humidity</h3>
                            <div className="item-content">
                                <img style={{ width: 48 }} src={Humidity} alt="" />
                                <span className="item-data">{`${weather.humidity.toFixed()}%`}</span>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">Visibility</h3>
                            <div className="item-content">
                                <img style={{ width: 48 }} src={Visibility} alt="" />

                                <span className="item-data">{`${formatVisibility(weather.visibility)}km`}</span>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="item-container">
                            <h3 className="item-title">Pressure</h3>
                            <div className="item-content">
                                <FontAwesomeIcon className="icon-blue" icon={faTemperatureHalf} />
                                <span className="item-data">{weather.pressure}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Today;
