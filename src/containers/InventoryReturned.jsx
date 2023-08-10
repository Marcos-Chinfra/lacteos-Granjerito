import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import ReturnedTable from '../components/ReturnedTable';
import PieChart from '../components/PieChart';

const InventoryReturned = ({API}) => {
    const {SyncLoader, handleSortChange, sortDirection} = useContext(AppContext)
    const [getReturned, setGetReturned] = useState(null);
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
        axios.get(`${API}/returned-products`)
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
        setDataChart(unSold)

    },[getReturned])

    console.log(getReturned)

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
                <PieChart dataChart={dataChart}/>
            </article>
        </main>
    );
}

export default InventoryReturned;