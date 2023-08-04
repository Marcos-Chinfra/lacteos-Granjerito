import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../context/AppContext';
import ProductMenuHeader from '../containers/ProductMenuHeader';
import ShiftOutput from '../components/ShiftOutput';
import axios from 'axios';

const Production = () => {
    // const hideMenu = location.pathname === '/' || location.pathname === '/login-staff'
    const { sendId, API } = useContext(AppContext);
    const [get, setGet] = useState(null);
    const [getProducts, setGetProducts] = useState(true);
    const [fabricados, setFabricados] = useState(true);

    useEffect(() => {
        async function getPost() {
            const response = await axios.get(`${API}/shift-output`);
            setGet(response.data);
            const respuesta = await axios.get(`${API}/products/${sendId}`);
            setGetProducts(respuesta.data)
        }
        getPost();
    }, []);

    return (
        <div className='w-screen h-4/5 flex flex-col p-8 items-start gap-5'>
            <ProductMenuHeader getProducts={getProducts}>
                {fabricados && <ShiftOutput get={get} /> }
            </ProductMenuHeader>
        </div>
    );
}

export default Production;