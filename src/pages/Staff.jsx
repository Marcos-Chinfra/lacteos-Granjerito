import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext'

const Staff = () => {
    const {API} = useContext(AppContext)
    const [ getStaff, setGetStaff] = useState(null)

    useEffect(()=>{
        axios.get(`${API}/staff`)
            .then((response) => {setGetStaff(response.data)})
            .catch((err)=>console.error(err))
    },[])

    return (
        <div className='w-screen h-4/5 flex p-10 items-start'>
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
                        <tr>
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.lastName}</td>
                            <td className="p-2">{item.phone}</td>
                            <td className="p-2">{item.role}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Staff;