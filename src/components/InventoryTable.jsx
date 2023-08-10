import React from 'react';

const InventoryTable = ({getInventory}) => {
    return (
        <table className="w-full border border-gray-200 shadow rounded " >
        <thead>
            <tr>
                <th className="py-1 px-2 text-left text-strong-blue  border-b text-sm">Producto</th>
                <th className="py-1 px-2 text-left text-strong-blue  border-b text-sm">Entradas</th>
                <th className="py-1 px-2 text-left text-strong-blue r border-b text-sm">Salidas</th>
                <th className="py-1 px-2 text-left text-strong-blue  border-b text-sm">Stock</th>
                <th className="py-1 px-2 text-left text-strong-blue  border-b text-sm">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {getInventory 
            &&
                getInventory.map((item)=>(
                <tr key={item.id}>
                    <td className="py-1 px-2 text-text-color text-sm ">{item.product.name}</td>
                    <td className="py-1 px-2 text-text-color text-sm">{item.incomings}</td>
                    <td className="py-1 px-2 text-text-color text-sm">{item.withdrawals}</td>
                    <td className="py-1 px-2 text-text-color text-sm">{item.stock}</td>
                    <td className="py-1 px-2 text-text-color text-sm hidden lg:table-cell"> 
                        {new Date(item.createdAt).toLocaleDateString('es-GT', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    
                    </td>
                    <td className="py-1 px-2 text-text-color text-sm table-cell lg:hidden">
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

export default InventoryTable;