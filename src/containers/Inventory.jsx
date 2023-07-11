import React from 'react';

const Inventory = () => {
    return (    
        <div className='w-screen h-4/5 flex p-10 items-start'>
            <table className="border-collapse border w-full" >
                <thead>
                    <tr>
                        <th className="p-2 text-left">id</th>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">entradas</th>
                        <th className="p-2 text-left">salidas</th>
                        <th className="p-2 text-left">stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">Celda 1</td>
                        <td className="p-2">Celda 2</td>
                        <td className="p-2">Celda 3</td>
                        <td className="p-2">Celda 4</td>
                        <td className="p-2">Celda 5</td>
                    </tr>
                    <tr>
                        <td className="p-2">Celda 6</td>
                        <td className="p-2">Celda 7</td>
                        <td className="p-2">Celda 8</td>
                        <td className="p-2">Celda 9</td>
                        <td className="p-2">Celda 10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;