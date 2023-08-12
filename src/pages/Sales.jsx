import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import BartChart from "../components/BartChart";
import PieChart from "../components/PieChart";
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1"

const Sales = () => {
    const { setSendId, getToken, handleSort } = useContext(AppContext);
    const [getSales, setGetSales] = useState([]);
    const [getAllSales, setGetAllSales] = useState(null);
    const [getAllSoldProducts, setGetAllSoldProducts] = useState(null);
    const [dataPieChart, setDataPieChart] = useState({})
    const [dataBarChart, setDataBarChart] = useState({})

    const apiKey = import.meta.env.VITE_API_KEY;
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    const searchSales = (arr) => {
        let sale = arr.filter((item) => item.total === 0 )
        setGetSales(handleSort(sale))
    }

    useEffect(() => {
        axios.get(`${API}/sales`, { headers })
        .then((response) => {
            let sales = response.data;
            setGetAllSales(sales)
            searchSales(sales)})
        .catch((err) => console.error(err))

        axios.get(`${API}/sold-products`, { headers })
        .then((response) => {setGetAllSoldProducts(response.data)})
        .catch((err) => console.error(err))
    }, []);

    useEffect(()=>{
        const sold = {};
        if(getAllSoldProducts){
            getAllSoldProducts.forEach(item => {
                const name = item.product.name;
                const amount = item.amount;
                if(sold.hasOwnProperty(name)) {
                    sold[name] += amount;
                } else {
                    sold[name] = amount;
                }
            });
        }
        setDataPieChart(sold)
    },[getAllSoldProducts]);

    useEffect(()=>{
        const staffs = {};
        if(getAllSales){
            getAllSales.forEach(item => {
                const name = item.staff.name;
                const amount = item.total;
                if(staffs.hasOwnProperty(name)) {
                    staffs[name] += amount;
                } else {
                    staffs[name] = amount;
                }
            });
        }
        setDataBarChart(staffs)
    },[getAllSales])

    return (
        <div 
            className='w-screen flex flex-col p-5 mt-6 lg:mt-0 lg:p-10 items-start overflow-y-auto'
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

            <section className='w-full flex mt-5 flex-col md:flex-row '>
                <article className='w-full md:w-1/2 mx-auto p-5'>
                    <BartChart dataBarChart={dataBarChart} title={'Gráfico de producción'}/>
                </article>
                <article className='w-full md:w-1/2 mx-auto p-5'>
                    <PieChart dataPieChart={dataPieChart} title={'Gráfico de ventas'}/>
                </article>
            </section>
        </div>
    );
}

export default Sales;