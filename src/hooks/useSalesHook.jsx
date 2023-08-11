import {useState} from 'react';
import { SyncLoader }  from "react-spinners";
import Swal from 'sweetalert2';

const useSalesHook = () => {
    const [sortDirection, setSortDirection] = useState('desc');
    const [getToken, setGetToken ] = useState(() => {
        const storedToken = localStorage.getItem('authToken');
        return storedToken || '';
    });
    const [sendId, setSendId] = useState(null);
    const [account, setAccount] = useState(() => {
        const storedAccount = localStorage.getItem('accountUser');
        return storedAccount || {};
    });
    const API = "https://powerful-scrubland-84047-e2a369138362.herokuapp.com/api/v1";

    const saveToken = (newToken) => {
        localStorage.setItem('authToken', newToken);
        setGetToken(newToken)
    }

    const saveAccount = (newToken) => {
        const newAccount = JSON.stringify(newToken)
        localStorage.setItem('accountUser', newAccount);
        setAccount(newAccount)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken');
        setGetToken('')
    }

    const removeAccount = () => {
        localStorage.removeItem('accountUser');
        setAccount({})
    }

    const searchProduct = (name, arr) => { 
        try{
            let product =  arr.find(item => item.name === name);
            if(product){
                return product.id
            }else{
                return null
            }
        }catch(error){
            console.error("Error al buscar el producto: " , error);
            errorAlert('El producto no se puede encontrar en la base de datos');
            return null
        }
    };

    const saveAlert = (ruta, texto, titulo, vista) => {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: 'success',
            // showCancelButton: true,
            confirmButtonText: `Go to ${vista}`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/${ruta}`; 
            }
        });
    };

    const errorAlert = (texto) => {
        Swal.fire({
                title: "Algo salio mal!",
                text: texto,
                icon: "error",
                confirmButtonText: "Ok",
        });
    };

    const successAlert = (titulo, texto) => {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: "success",
            confirmButtonText: "Ok",
        });
    };

    const alertDelete = (arr) => {
        Swal.fire({
            title: '¿Estas seguro que quieres eliminarlo?',
            text: "No se podrá revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, quiero eliminarlo!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'El registro a sido eliminado.',
                    'success'
                );
                arr()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Los datos están seguros',
                    'error'
                );
            };
        })
    };


    const handleSortChange = (arr) => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);

        const sorted = arr.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
        return sorted
    };

    const handleSort = (arr) => {
        const sorted = arr.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return  dateB - dateA 
        });
        setSortDirection('desc')
        return sorted
    };


    return {
        sendId,
        API,
        sortDirection,
        getToken, 
        account, 
        handleSort,
        saveAccount,
        removeToken,
        saveToken, 
        SyncLoader,
        setSendId,
        searchProduct,
        saveAlert,
        errorAlert,
        successAlert,
        alertDelete,
        handleSortChange
    }
};

export default useSalesHook;