import React from 'react';

const ReturnedTable = ({getReturned}) => {
    return (
        <table className="w-full border border-gray-200 shadow rounded" >
        <caption>Cambios</caption>
        <thead>
            <tr>
                <th className="px-1 py-1 text-left text-strong-blue border-b text-sm">Producto</th>
                <th className="px-1 py-1 text-left text-strong-blue border-b text-sm">Cantidad</th>
                <th className="px-1 py-1 text-left text-strong-blue border-b text-sm">Vendedor</th>
                <th className="px-1 py-1 text-left text-strong-blue border-b text-sm">Ruta</th>
                <th className="px-1 py-1 text-left text-strong-blue border-b text-sm">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {getReturned &&
                getReturned.map((item)=>(
                    <tr key={item.id}> 
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal">{item.product.name}</td>
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal">{item.amount}</td>
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal">{item.sale.staff.name}</td>
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal">{item.sale.route.name}</td>
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal hidden lg:table-cell">
                            {new Date(item.createdAt).toLocaleDateString('es-GT', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}
                        </td>
                        <td className="px-1 py-1 text-left text-text-color text-sm font-normal table-cell lg:hidden">
                            {new Date(item.createdAt).toLocaleDateString('es-GT', {
                                month: '2-digit',
                                day: '2-digit',
                            })}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    );
}

export default ReturnedTable;