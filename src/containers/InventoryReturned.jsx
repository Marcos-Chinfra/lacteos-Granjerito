import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import ReturnedTable from '../components/ReturnedTable';
import PieChart from '../components/PieChart';

const InventoryReturned = ({API}) => {
    const {SyncLoader, handleSortChange, sortDirection, getToken} = useContext(AppContext)
    const [getReturned, setGetReturned] = useState(null);
    const [dataPieChart, setDataPieChart] = useState({})

    const override =  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "20px 0",
        height: "60px"
    };

    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(()=>{
        axios.get(`${API}/returned-products`, { headers })
            .then((response)=>{setGetReturned(handleSortChange(response.data))})
            .catch((err)=>{console.error(err)})
    },[]);

    useEffect(()=>{
        const unSold = {};
        if(getReturned){
            getReturned.forEach(item => {
                const name = item.product.name;
                const amount = item.amount;

                if(unSold.hasOwnProperty(name)) {
                    unSold[name] += amount;
                } else {
                    unSold[name] = amount;
                }
            });
        }
        setDataPieChart(unSold)

    },[getReturned])


    return (
        <main className='w-full flex flex-col md:flex-row '>
            <section className='w-full md:w-1/2 '>
                {
                    getReturned 
                    ?
                    <div className='relative overflow-x-auto max-w-tables mx-auto'>
                        <div className='w-full flex justify-center my-2'>
                            <button className='absolute left-0' onClick={() => handleSortChange(getReturned)}>
                                {sortDirection === 'asc' 
                                ? 
                                    <i className="fa-solid fa-arrow-up-long text-lg text-side hover:text-liner-color"></i> 
                                : 
                                    <i className="fa-solid fa-arrow-down-long text-lg text-side hover:text-liner-color"></i>
                                }
                            </button>
                            <h1>
                                Cambios
                            </h1>
                        </div>
                        <ReturnedTable getReturned={getReturned} />
                    </div>
                        
                    :
                        <SyncLoader color='#11aaff'  cssOverride={override} />
                }
            </section>
            <article className='w-full md:w-1/2 md:px-3 mt-5' >
                <PieChart dataPieChart={dataPieChart} title={'Productos cambiados'}/>
            </article>
        </main>
    );
}

export default InventoryReturned;