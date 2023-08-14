import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import ProviderRegister from '../components/modalsComponents/ProviderRegister';

const Providers = () => {
    const {API, getToken} = useContext(AppContext);
    const [ getProviders, setGetProviders] = useState(null);
    const [register, setRegister] = useState(false)

    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(()=>{
        axios.get(`${API}/providers`, { headers })
            .then((response) => {setGetProviders(response.data)})
            .catch((err)=>console.error(err))
    },[register]);

    const ModalIsOpen = () => {
        setRegister(true)
    }

    const ModalOnClose = () => {
        setRegister(false)
    }

    return (
        <main className='w-screen h-4/5 flex p-10 items-start'>
            <section className='w-full flex flex-col lg:flex-row  items-center gap-7'>
            <table className=" w-3/4 p-2 border-collapse border bg-orange-50 border-gray-200" >
                <thead>
                    <tr>
                        <th className="p-2 text-left">Nombre</th>
                        <th className="p-2 text-left">Jornada</th>
                        <th className="p-2 text-left">Cantidad (litros)</th>
                    </tr>
                </thead>
                <tbody>
                    {getProviders &&
                        getProviders.map((item)=>(
                            <tr key={item.id}>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.company}</td>
                                <td className="p-2">{item.createdAt}</td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
            <button   
                    onClick={ModalIsOpen}
                    className='flex items-center justify-center text-center border rounded-lg bg-side px-2 py-3 max-w-button text-Magnolia hover:bg-Magnolia hover:text-side hover:border-side'
                    >
                        Registrar 
            </button>
            </section>
            {register &&
                <ProviderRegister isOpen={register} onClose={ModalOnClose} />
            }
        </main>
    );
}

export default Providers;