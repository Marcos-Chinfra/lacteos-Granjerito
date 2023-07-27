import React from 'react';

const Providers = () => {
    return (
        <div className='w-screen h-4/5 flex p-10 items-start'>
            <table className="border-collapse border w-full" >
                <thead>
                    <tr>
                        <th className="p-2 text-left">id</th>
                        <th className="p-2 text-left">name</th>
                        <th className="p-2 text-left">company</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">Celda 1</td>
                        <td className="p-2">Celda 2</td>
                        <td className="p-2">Celda 3</td>
                    </tr>
                    <tr>
                        <td className="p-2">Celda 4</td>
                        <td className="p-2">Celda 5</td>
                        <td className="p-2">Celda 6</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Providers;