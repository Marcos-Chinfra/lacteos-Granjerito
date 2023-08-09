import React  from 'react';



const UnsoldTable = ({getUnSold}) => {

    return (
            <table className="border-collapse border border-gray-400  w-full " >
                <caption>Regresos</caption>
                <thead>
                    <tr>
                        <th className="p-2 text-left text-strong-blue border-b">Producto</th>
                        <th className="p-2 text-left text-strong-blue border-b">Cantidad</th>
                        <th className="p-2 text-left text-strong-blue border-b">Vendedor</th>
                        <th className="p-2 text-left text-strong-blue border-b">Ruta</th>
                        <th className="p-2 text-left text-strong-blue border-b">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {getUnSold &&
                        getUnSold.map((item)=>(
                            <tr key={item.id}> 
                                <td className="p-2 text-gray-600">{item.product.name}</td>
                                <td className="p-2 text-gray-600">{item.amount}</td>
                                <td className="p-2 text-gray-600">{item.sale.staff.name}</td>
                                <td className="p-2 text-gray-600">{item.sale.route.name}</td>
                                <td className="p-2 text-gray-600">
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

export default UnsoldTable;