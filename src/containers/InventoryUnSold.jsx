import React, {useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import UnsoldTable from '../components/UnsoldTable';
import AppContext from '../context/AppContext';
import PieChart from '../components/PieChart';

const InventoryUnSold = () => {
    const {SyncLoader, API, sortDirection, handleSortChange} = useContext(AppContext);
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
            .then((response)=>{setGetUnSold(handleSortChange(response.data))})
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
    },[getUnSold]);


    return (
        <main className='w-full flex flex-col md:flex-row '>          
            <section className='w-full md:w-1/2 '>
                { getUnSold 
                    ?   
                    <div className='max-w-tables mx-auto relative overflow-x-auto'>
                        <div className='w-full flex justify-center my-2'>
                            <button className='absolute left-0' onClick={()=>handleSortChange(getUnSold)}>
                                {sortDirection === 'asc' 
                                ? 
                                    <i className="fa-solid fa-arrow-up-long text-lg text-side hover:text-liner-color"></i> 
                                : 
                                    <i className="fa-solid fa-arrow-down-long text-lg text-side hover:text-liner-color"></i>
                                }
                            </button>
                            <h1>
                                Regresos
                            </h1>
                        </div>
                        <UnsoldTable getUnSold={getUnSold} />
                    </div>
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