import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import InventoryView from '../containers/InventoryView';
import InventoryShifts from '../containers/InventoryShifts';
import InventoryReturned from '../containers/InventoryReturned';
import InventoryUnSold from '../containers/InventoryUnSold';


const Inventory = () => {
    const { API } = useContext(AppContext);
    const [inventario, setInventario] = useState(true);
    const [fabricados, setFabricados] = useState(false);
    const [cambiados, setCambiados] = useState(false);
    const [regresados, setRegresados] = useState(false);

    const handleSelectChange = (event) => {
        const valorSeleccionado = event.target.value;
        if(valorSeleccionado === 'General'){
            setInventario(true);
            setFabricados(false);
            setRegresados(false);
            setCambiados(false);
        }else if(valorSeleccionado === 'Producción'){
            setInventario(false);
            setFabricados(true);
            setRegresados(false);
            setCambiados(false);
        }
        else if(valorSeleccionado === 'Regresos'){
            setInventario(false);
            setFabricados(false);
            setRegresados(true);
            setCambiados(false);
        }
        else if(valorSeleccionado === 'Cambios'){
            setInventario(false);
            setFabricados(false);
            setRegresados(false);
            setCambiados(true);
        }
    };

    return (    
        <div className='w-screen  flex flex-col px-10 py-5 items-start overflow-y-auto scroll'>
            <section className='flex w-full h-4  items-center '>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones" onChange={handleSelectChange}>
                    <option value="General">General</option>
                    <option value="Producción">Producción</option>
                    <option value="Regresos">Regresos</option>
                    <option value="Cambios">Cambios</option>
                </select>
            </section>
            <section className='w-full mt-4'>
                {inventario && <InventoryView API={API}/>}
                {fabricados && <InventoryShifts API={API}/>}
                {regresados && <InventoryUnSold API={API}/>}
                {cambiados && <InventoryReturned API={API}/>}
            </section>
        </div>
    );
}

export default Inventory;