import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataPieChart, title }) => {
    const datos = Object.keys(dataPieChart)
    const totalItems = datos.length;

    const backgroundColors = Array.from({ length: totalItems }, (_, index) => {
        const hue = (360 / totalItems) * index;
        return `hsl(${hue}, 70%, 60%)`;
    });

    const data = {
        labels: Object.keys(dataPieChart),
        datasets: [
            {
                label: 'Regresos de los productos',
                data: Object.values(dataPieChart),
                borderColor: backgroundColors,
                borderWidth: 1,
                backgroundColor: backgroundColors
            },
        ],
    };
    
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const sum = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / sum) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        responsive: true,
    }

    return (
        <div className='w-full max-w-pieChartInventory mx-auto min-w-chart rounded bg-gray-50 shadow p-2'>
            <h2 className='text-center'>{`${title}`}</h2>
            <Pie data={data} options={options} />
        </div>
    );
}

export default PieChart;

