import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import BartChart from "../components/BartChart";
import PieChart from "../components/PieChart";
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1"

const Sales = () => {
    const { setSendId } = useContext(AppContext);
    const [getSales, setGetSales] = useState([]);
    const [getAllSales, setGetAllSales] = useState(null);
    const [dataChart, setDataChart] = useState({})

    const searchSales = (arr) => {
        let sale = arr.filter((item) => item.total === 0 )
        setGetSales(sale)
    }

    useEffect(() => {
        axios.get(`${API}/sales`)
        .then((response) => {searchSales(response.data)})
        .catch((err) => console.error(err))

        axios.get(`${API}/sold-products`)
        .then((response) => {setGetAllSales(response.data)})
        .catch((err) => console.error(err))
    }, []);

    useEffect(()=>{
        const sold = {};
        if(getAllSales){
            getAllSales.forEach(item => {
                const name = item.product.name;
                const amount = item.amount;
                if(sold.hasOwnProperty(name)) {
                    sold[name] += amount;
                } else {
                    sold[name] = amount;
                }
            });
        }
        setDataChart(sold)
    },[getAllSales])
console.log(dataChart)

    return (
        <div 
            className='w-screen  flex flex-col p-5 mt-6 lg:mt-0 lg:p-10 items-start overflow-y-auto'
        >
            <section 
                className='w-full flex flex-col lg:flex-row  items-center gap-7'
            >
            <table 
                    className=" w-3/4 p-2 border-collapse border bg-orange-50 border-gray-200"
                >
                    <thead>
                        <tr>
                            <th 
                                className="p-2 text-left text-liner-color border-b"
                            >
                                Vendedor
                            </th>
                            <th 
                                className="p-2 text-left text-liner-color border-b"
                            >
                                Ruta
                            </th>
                            <th 
                                className="p-2 text-left text-liner-color border-b"
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getSales.map((item) => (
                            <tr key={item.id}>
                                <td 
                                    className="p-2 text-gray-600"
                                >
                                    {`${item.staff.name} ${item.staff.lastName}`}
                                </td>
                                <td 
                                    className="p-2 text-gray-600"
                                >
                                    {`${item.route.name} `}
                                </td>
                                <td 
                                    className="w-1/6 text-xs text-gray-600"
                                >
                                    <Link 
                                        to="/update-sale"
                                        onClick={() => setSendId(item.id)}  
                                    >
                                        Actualizar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link   
                    to="/sing-up" 
                    className='flex items-center justify-center text-center border rounded-lg bg-side px-2 py-3 max-w-button text-Magnolia hover:bg-Magnolia hover:text-side hover:border-side'
                    >
                        Registrar nueva venta
                </Link>
            </section>
            <section className='w-full flex mt-5'>
                <article className='w-1/2'>
                    <BartChart/>
                </article>
                <article className='w-1/2'>
                    <PieChart dataChart={dataChart}/>
                </article>
            </section>
        </div>
    );
}

export default Sales;