import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../context/AppContext';
import ProductMenuHeader from '../containers/ProductMenuHeader';
import ShiftOutput from '../components/ShiftOutput';
//import UnsoldTable from '../containers/UnsoldTable';
//import ReturnTable from '../containers/ReturnTable';
import axios from 'axios';

const Production = () => {
    const { sendId, API, getToken } = useContext(AppContext);
    const [get, setGet] = useState(null);
    const [getProducts, setGetProducts] = useState(true);
    const [fabricados, setFabricados] = useState(true);
    const [regresados, setRegresados] = useState(false);
    const [cambiados, setCambiados] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY
    const headers = {
        'API': apiKey,
        'Authorization': `Bearer ${getToken}`
    }

    useEffect(() => {
        async function getPost() {
            const response = await axios.get(`${API}/shift-output?product=${sendId}`, {headers});
            setGet(response.data);
            const respuesta = await axios.get(`${API}/products/${sendId}`,{headers});
            setGetProducts(respuesta.data)
        }
        getPost();
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
                {fabricados && <ShiftOutput get={get} /> }
                {regresados && <UnsoldTable API={API} get={get}/>}
                {/*cambiados && <ReturnTable API={API} get={get}/>*/}
            </ProductMenuHeader>
        </div>
    );
}

export default Production;