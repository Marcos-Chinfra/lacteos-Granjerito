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

const BartChart = () => {
        const data = {
            labels: ['Edin', 'Ruben', 'Jose'],
            datasets: [
                {
                    label: 'Ventas por Mes',
                    data: [1200, 1909, 3000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                <h2>Gráfico de Líneas</h2>
                <Bar data={data} options={options} />
            </div>
        );
}

export default BartChart;