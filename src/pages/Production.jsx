import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../context/AppContext';
import ProductMenuHeader from '../containers/ProductMenuHeader';
import Manufactured from '../components/Manufactured';
import UnsoldTable from '../components/UnsoldTable';
import ReturnedTable from '../components/ReturnedTable';
import axios from 'axios';

const Production = () => {
    const { sendId, API, getToken } = useContext(AppContext);
    const [geShiftOutput, setGetShiftOutput] = useState(null);
    const [getProducts, setGetProducts] = useState(true);
    const [getUnSold, setGetUnSold] = useState(null)
    const [getReturned, setGetReturned] = useState(null)
    const [fabricados, setFabricados] = useState(true);
    const [regresados, setRegresados] = useState(false);
    const [cambiados, setCambiados] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(() => {
        async function getData() {
            const shiftOutput = await axios.get(`${API}/shift-output?product=${sendId}`, {headers});
            setGetShiftOutput(shiftOutput.data);
            const returned = await axios.get(`${API}/returned-products?product=${sendId}`, {headers});
            setGetReturned(returned.data);
            const unSold = await axios.get(`${API}/unsold-products?product=${sendId}`, {headers});
            setGetUnSold(unSold.data);
            const respuesta = await axios.get(`${API}/products/${sendId}`,{headers});
            setGetProducts(respuesta.data)
        }
        getData();
    }, []);

    const handleShiftOutput = (e) => {
        setFabricados(true);
        setCambiados(false);
        setRegresados(false);
    };

    const handleReturn = (e) => {
        setFabricados(false);
        setCambiados(true);
        setRegresados(false);
    };

    const handleUnsold = (e) => {
        setFabricados(false);
        setCambiados(false);
        setRegresados(true);
    };

    return (
        <div className='w-screen h-4/5 flex flex-col p-8 items-start gap-5'>
            <ProductMenuHeader getProducts={getProducts} handleShiftOutput={handleShiftOutput} handleReturn={handleReturn} handleUnsold={handleUnsold} fabricados={fabricados} regresados={regresados} cambiados={cambiados}>
                {fabricados && <Manufactured geShiftOutput={geShiftOutput} /> }
                {regresados && <UnsoldTable getUnSold={getUnSold}/>}
                {cambiados && <ReturnedTable getReturned={getReturned}/>}
            </ProductMenuHeader>
        </div>
    );
}

export default Production;