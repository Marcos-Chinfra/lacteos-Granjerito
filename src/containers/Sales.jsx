import React from 'react';
import { Link } from 'react-router-dom';

const Sales = () => {


    return (
        <div className='w-screen h-4/5 flex p-10 items-start'>
            <section className='w-full flex justify-between items-center'>
                <table className=" w-3/4 p-2 border-collapse border bg-orange-50 border-gray-200">
                <thead>
                    <tr>
                        <th className="p-2 text-left text-liner-color border-b">Vendedor</th>
                        <th className="p-2 text-left text-liner-color border-b">Ruta</th>
                    </tr>
                </thead>
                {/* <tbody>
                    <tr>
                        <td className="p-2 text-gray-600">Celda 1</td>
                        <td className="p-2 text-gray-600">Celda 1</td>
                    </tr>
                    <tr>
                        <td className="p-2 text-gray-600">Celda 6</td>
                    </tr>
                    <td className="p-2 text-gray-600">Celda 6</td>
                </tbody>
                 */}
                </table>
                <Link to="/sing-up" className='flex items-center justify-center text-center rounded-full bg-side w-1/5 max-w-button h-20 p-2  text-button'>Registrar nueva venta</Link>
                </section>
        </div>
    );
}

export default Sales;