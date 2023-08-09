import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Queso', 'Crema', 'Requeson', 'Mantequilla', 'Yogurt'],
        datasets: [
            {
                label: 'Regresos de los productos',
                data: [150, 199, 300, 237, 239],
                borderColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgb(240, 130, 41)',
                    'rgb(1, 93, 176)',
                    'rgb(112, 118, 149)',
                    'rgb(70, 98, 51)'
                ],
                borderWidth: 1,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgb(240, 130, 41)',
                    'rgb(1, 93, 176)',
                    'rgb(112, 118, 149)',
                    'rgb(70, 98, 51)'
                ]


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
            <h2 className='text-center'>Productos fabricados</h2>
            <Pie data={data} options={options} />
        </div>
    );
}

export default PieChart;

