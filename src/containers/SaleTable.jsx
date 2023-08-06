import React, {useState, useEffect}  from 'react';
import axios from 'axios';

const SaleTable = ({API}) => {
    const [getSales, setGetSales] = useState(null);

    useEffect(()=>{
        axios.get(`${API}/sales`)
            .then((response)=>{setGetSales(response.data)})
            .catch((err)=>{console.error(err)})
    },[]);

    return (
        <main>
            <table className="border-collapse border border-gray-400 w-full" >
                <caption>Vendidos</caption>
                <thead>
                    <tr>
                        <th className="p-2 text-left text-liner-color border-b">Empleado</th>
                        <th className="p-2 text-left text-liner-color border-b">Ruta</th>
                        <th className="p-2 text-left text-liner-color border-b">Total</th>
                        <th className="p-2 text-left text-liner-color border-b">Observaciones</th>
                        <th className="p-2 text-left text-liner-color border-b">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                {getSales && 
                    getSales.map((item) =>(
                        <tr key={item.id}>
                            <td className="p-2 text-gray-600">{item.staff.name}</td>
                            <td className="p-2 text-gray-600">{item.route.name}</td>
                            <td className="p-2 text-gray-600">{item.total}</td>
                            <td className="p-2 text-gray-600">{item.observations}</td>
                            <td className="p-2 text-gray-600">{new Date(item.createdAt).toLocaleDateString('es-GT', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </main>
    );
}

export default SaleTable;