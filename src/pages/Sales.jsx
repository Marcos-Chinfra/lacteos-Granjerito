import React from 'react';
import { Link } from 'react-router-dom';

const Sales = () => {


    return (
        <div className='w-screen h-4/5 flex p-10 items-start'>
            <section className='w-full flex flex-col lg:flex-row  items-center gap-7'>
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
                <Link to="/sing-up" className='flex items-center justify-center text-center border rounded-lg bg-side px-2 py-3 max-w-button text-Magnolia hover:bg-Magnolia hover:text-side hover:border-side'>Registrar nueva venta</Link>
                </section>
        </div>
    );
}

export default Sales;