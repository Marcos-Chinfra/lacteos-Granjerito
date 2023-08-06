import React, {useState, useEffect}  from 'react';
import axios from 'axios';

const UnsoldTable = ({API}) => {
    const [getUnSold, setGetUnSold] = useState(null);

    useEffect(()=>{
        axios.get(`${API}/unsold-products`)
            .then((response)=>{setGetInventory(response.data)})
            .catch((err)=>{console.error(err)})
    },[]);

    return (
        <main>
            <table className="border-collapse border border-gray-400 w-full" >
                <caption>Regresos</caption>
                <thead>
                    <tr>
                        <th className="p-2 text-left text-liner-color border-b">Producto</th>
                        <th className="p-2 text-left text-liner-color border-b">Cantidad</th>
                        <th className="p-2 text-left text-liner-color border-b">salidas</th>
                        <th className="p-2 text-left text-liner-color border-b">stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 text-gray-600">Celda 1</td>
                        <td className="p-2 text-gray-600">Celda 2</td>
                        <td className="p-2 text-gray-600">Celda 3</td>
                        <td className="p-2 text-gray-600">Celda 4</td>
                        <td className="p-2 text-gray-600">Celda 5</td>
                    </tr>
                    <tr>
                        <td className="p-2 text-gray-600">Celda 6</td>
                        <td className="p-2 text-gray-600">Celda 7</td>
                        <td className="p-2 text-gray-600">Celda 8</td>
                        <td className="p-2 text-gray-600">Celda 9</td>
                        <td className="p-2 text-gray-600">Celda 10</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default UnsoldTable;