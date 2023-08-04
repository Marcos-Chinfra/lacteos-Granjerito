import React from 'react';

const ShiftOutput = ({ get }) => {
    return (
    <table className="border-collapse border border-gray-400 w-full" >
        <thead>
            <tr>
                <th className="p-2 text-center text-strong-blue border-b">Producto</th>
                <th className="p-2 text-center text-strong-blue border-b">Elaborados</th>
                <th className="p-2 text-center text-strong-blue border-b">Jornada</th>
                <th className="p-2 text-center text-strong-blue border-b">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {get && 
                get.map((item)=>(
                    <tr key={item.id}>
                        <td className="p-2 text-center text-text-color">
                            {`${item.product.name}`}
                        </td>
                        <td className="p-2 text-center text-text-color">
                            {`${item.amount}`}
                        </td>
                        <td className="p-2 text-center text-text-color">
                            {`${item.workingDay}`}
                        </td>
                        <td className="p-2 text-center text-text-color">
                            {new Date(item.createdAt).toLocaleDateString('es-GT', {
                                year: 'numeric',
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

export default ShiftOutput;