import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import InventoryTable from '../containers/InventoryTable';
import InventoryShifts from '../containers/InventoryShifts';
import ReturnTable from '../containers/ReturnTable';
import SaleTable from '../containers/SaleTable';
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
        <div className='w-screen h-4/5 flex flex-col px-10 py-5 items-start'>
            <section className='flex w-full h-4  items-center '>
                <label className='mr-2' htmlFor="opciones">Categorías:</label>
                <select id="opciones" name="opciones" onChange={handleSelectChange}>
                    <option value="General">General</option>
                    <option value="Producción">Producción</option>
                    <option value="Regresos">Regresos</option>
                    <option value="Cambios">Cambios</option>
                </select>
            </section>
            <section className='w-full mt-4 h-full'>
                {inventario && <InventoryTable API={API}/>}
                {fabricados && <InventoryShifts API={API}/>}
                {regresados && <InventoryUnSold API={API}/>}
                {cambiados && <ReturnTable API={API}/>}
            </section>
        </div>
    );
}

export default Inventory;