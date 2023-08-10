import React, {useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import UnsoldTable from '../components/UnsoldTable';
import AppContext from '../context/AppContext';
import PieChart from '../components/PieChart';

const InventoryUnSold = () => {
    const {SyncLoader, API} = useContext(AppContext);
    const [getUnSold, setGetUnSold] = useState(null);
    const [dataChart, setDataChart] = useState({})

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

    useEffect(()=>{
        const unSold = {};
        if(getUnSold){
            getUnSold.forEach(item => {
                const name = item.product.name;
                const amount = item.amount;

                if(unSold.hasOwnProperty(name)) {
                    unSold[name] += amount;
                } else {
                    unSold[name] = amount;
                }
            });
        }
        setDataChart(unSold)
    },[getUnSold])


    return (
        <main className='w-full flex flex-col md:flex-row '>          
            <section className='w-full md:w-1/2  overflow-x-auto  max-w-tables mx-auto'>
                { getUnSold 
                    ?   
                        <UnsoldTable getUnSold={getUnSold} /> 
                    :
                        <SyncLoader color='#11aaff'  cssOverride={override} />
                }
            </section>
            <article className='w-full md:w-1/2 md:px-3 mt-5 '>
                <PieChart  dataChart={dataChart}/>
            </article>
        </main>
    );
}

export default InventoryUnSold;