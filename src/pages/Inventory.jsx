import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import InventoryTable from '../containers/InventoryTable';
import SaleTable from '../containers/SaleTable';


const Inventory = () => {
    const { API } = useContext(AppContext);
    const [inventario, setInventario] = useState(true);
    const [vendidos, setVendidos] = useState(false);


    const handleSelectChange = (event) => {
        const valorSeleccionado = event.target.value;
        if(valorSeleccionado === 'General'){
            setInventario(true);
            setVendidos(false);
            setRegresados(false);
            setCambiados(false);
        }else if(valorSeleccionado === 'Ventas'){
            setInventario(false);
            setVendidos(true);
            setRegresados(false);
            setCambiados(false);
        }
        else if(valorSeleccionado === 'Regresos'){
            setInventario(false);
            setVendidos(false);
            setRegresados(true);
            setCambiados(false);
        }
        else if(valorSeleccionado === 'Cambios'){
            setInventario(false);
            setVendidos(false);
            setRegresados(false);
            setCambiados(true);
        }
    };

    return (    
        <div className='w-screen h-4/5 flex flex-col p-10 items-start'>
            <section className='flex w-full h-4  items-center'>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones" onChange={handleSelectChange}>
                    <option value="General">General</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Regresos">Regresos</option>
                    <option value="Cambios">Cambios</option>
                </select>
            </section>
            <section>
                {inventario && <InventoryTable API={API}/>}
                {vendidos && <SaleTable API={API}/>}

            </section>
        </div>
    );
}

export default Inventory;