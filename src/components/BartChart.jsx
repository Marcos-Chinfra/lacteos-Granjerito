import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    PointElement,
    LinearScale,
    Tooltip,
    Title,
    Legend,
    Filler
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    BarElement,
    PointElement,
    LinearScale,
    Tooltip,
    Title,
    Legend,
    Filler
)

const BartChart = ({ dataBarChart, title }) => {
        const data = {
            labels: Object.keys(dataBarChart),
            datasets: [
                {
                    label: 'Ventas por Mes',
                    data: Object.values(dataBarChart),
                    borderColor: '#11aaff',
                    borderWidth: 1,
                    backgroundColor: 'rgb(240, 246, 255)',
                },
            ],
        };
        
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
        
        return (
            <div className='w-full max-w-tables mx-auto min-w-chart rounded bg-gray-50 shadow p-2'>
                <h2 className='text-center'>{`${title}`}</h2>
                <Bar data={data} options={options} />
            </div>
        );
}

export default BartChart;