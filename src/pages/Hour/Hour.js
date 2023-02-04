import React, { useContext } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AppContext } from '../../context/AppContext';
import './Hour.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Hour = () => {
    const { weather } = useContext(AppContext);

    console.log(weather);

    const data = {
        labels: weather.hourly.map((item) => item.title),
        datasets: [
            {
                label: `Temp (°C)`,
                data: weather.hourly.map((item) => item.temp),
                backgroundColor: '#722ed1',
                borderColor: '#722ed1',
                borderWidth: 2,
            },
            {
                label: `Feel like (°C)`,
                data: weather.hourly.map((item) => item.feels_like),
                backgroundColor: '#237804',
                borderColor: '#237804',
                borderWidth: 2,
            },
        ],
    };

    var options = {
        maintainAspectRatio: false,
        scales: {},
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    };

    return <div className="chart-container">{weather && <Line data={data} height={400} options={options} />}</div>;
};

export default Hour;
