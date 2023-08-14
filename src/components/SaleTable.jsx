import React  from 'react';

const SaleTable = ({ saleCompleted }) => {

    return (
        <main className='w-full overflow-x-auto'>
            <table className="border border-gray-400 w-full" >
                <caption>Vendidos</caption>
                <thead>
                    <tr>
                        <th className="p-2 text-left text-strong-blue border-b">Empleado</th>
                        <th className="p-2 text-left text-strong-blue border-b">Ruta</th>
                        <th className="p-2 text-left text-strong-blue border-b">Total</th>
                        <th className="p-2 text-left text-strong-blue border-b hidden md:table-cell">Observaciones</th>
                        <th className="p-2 text-left text-strong-blue border-b">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                {saleCompleted && 
                    saleCompleted.map((item) =>(
                        <tr key={item.id}>
                            <td className="p-2 text-gray-600">{item.staff.name}</td>
                            <td className="p-2 text-gray-600">{item.route.name}</td>
                            <td className="p-2 text-gray-600">{item.total}</td>
                            <td className="p-2 text-gray-600 hidden md:table-cell">{item.observations}</td>
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