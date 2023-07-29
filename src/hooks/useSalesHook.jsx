import {useState} from 'react';

const useSalesHook = () => {

    const [sendId, setSendId] = useState(null);

    const searchProduct = (name, arr) => {
        try{
            let product =  arr.find(item => item.name == name);
            if(product){
                return product.id
            }else{
                return null
            }
        }catch(error){
            console.error("Error al buscar el producto: " , error);
            return null
        }
    };

    return {
        sendId,
        setSendId,
        searchProduct
    }
};

export default useSalesHook;