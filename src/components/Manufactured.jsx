import React from 'react';

const Manufactured = ({ geShiftOutput }) => {

    return (
        <table className="w-full border border-gray-200 shadow rounded" >
        <thead>
            <tr>
                <th className="px-2 py-1 text-left text-strong-blue border-b text-sm">Producto</th>
                <th className="px-2 py-1 text-left text-strong-blue border-b text-sm">Elaborados</th>
                <th className="px-2 py-1 text-left text-strong-blue border-b text-sm">Jornada</th>
                <th className="px-2 py-1 text-left text-strong-blue border-b text-sm">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {geShiftOutput && 
                geShiftOutput.map((item)=>(
                    <tr key={item.id}>
                        <td className="px-2 py-1 text-left text-text-color text-sm font-normal">
                            {`${item.product.name}`}
                        </td>
                        <td className="px-2 py-1 text-left text-text-color text-sm font-normal">
                            {`${item.amount}`}
                        </td>
                        <td className="px-2 py-1 text-left text-text-color text-sm font-normal">
                            {`${item.workingDay}`}
                        </td>
                        <td className="px-2 py-1 text-left text-text-color text-sm font-normal hidden lg:table-cell">
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

export default Manufactured;