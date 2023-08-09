import React, {useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import UnsoldTable from '../components/UnsoldTable';
import AppContext from '../context/AppContext';
import PieChart from '../components/PieChart';

const InventoryUnSold = () => {
    const {SyncLoader, API, searchProduct, successAlert, errorAlert} = useContext(AppContext);
    const [getUnSold, setGetUnSold] = useState(null);

    const override =  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "20px 0",
        height: "60px"
    };

    useEffect(()=>{
        axios.get(`${API}/unsold-products`)
            .then((response)=>{setGetUnSold(response.data)})
            .catch((err)=>{console.error(err)})
    },[]);

    return (
        <main className='w-full flex flex-col md:flex-row '>          
            <section className='w-full md:w-1/2 md:px-4 overflow-x-auto overflow-y-auto max-h-tables'>
                { getUnSold 
                    ?   
                        <UnsoldTable getUnSold={getUnSold} /> 
                    :
                        <SyncLoader color='#11aaff'  cssOverride={override} />
                }
            </section>
            <article className='w-full md:w-1/2 md:px-3 mt-5'>
                <PieChart />
            </article>
        </main>
    );
}

export default InventoryUnSold;