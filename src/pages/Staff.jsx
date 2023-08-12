import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext'

const Staff = () => {
    const {API, getToken} = useContext(AppContext);
    const [ getStaff, setGetStaff] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(()=>{
        axios.get(`${API}/staff`, { headers })
            .then((response) => {setGetStaff(response.data)})
            .catch((err)=>console.error(err))
    },[])

    return (
        <main className='w-screen h-4/5 flex p-10 items-start'>
            <section className='w-full flex flex-col lg:flex-row  items-center gap-7'>
            <table className="border-collapse border w-full" >
                <caption>Empleados</caption>
                <thead>
                    <tr>
                        <th className="p-2 text-left">Nombre</th>
                        <th className="p-2 text-left">Apellido</th>
                        <th className="p-2 text-left">Teléfono</th>
                        <th className="p-2 text-left">role</th>
                    </tr>
                </thead>
                <tbody>
                    {getStaff &&
                        getStaff.map((item)=>(
                        <tr key={item.id}>
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.lastName}</td>
                            <td className="p-2">{item.phone}</td>
                            <td className="p-2">{item.role}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            <button   
                className='flex items-center justify-center text-center border rounded-lg bg-side px-2 py-3 max-w-button text-Magnolia hover:bg-Magnolia hover:text-side hover:border-side'
                >
                    Registrar
            </button>
            </section>

        </main>
    );
}

export default Staff;