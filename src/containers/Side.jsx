import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Side = () => {
    const { account } = useContext(AppContext);
    const [burgerMenu, setBurgerMenu] = useState(false)

    let username = JSON.parse(account).name

    return (
        <nav className='flex w-screen h-1/5 px-8 justify-around lg:justify-start  lg:h-screen lg:w-1/5 lg:max-w-custom  lg:flex-col items-center lg:py-20  bg-side text-gray-100'>
                <article className='flex items-center lg:flex-col'>
                    <h4 className='font-lg text-xl'>{`${username}`}</h4>
                </article>


            <section className='flex md:hidden relative'>
                <i 
                    className="fa-solid fa-bars text-2xl"
                    onClick={()=> {setBurgerMenu(!burgerMenu)}}
                ></i>
                {burgerMenu && 
                <article className=''>
                    <ul className='bg-white text-side absolute rounded border border-side burger-menu p-2 shadow-md'>
                        <li 
                            className='border-b border-liner-color'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/inventory">Inventario</Link>
                        </li>
                        <li 
                            className='border-b border-liner-color mt-1'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/sales">Ventas</Link>
                        </li>
                        <li 
                            className='border-b border-liner-color mt-1'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/providers">Proveedores</Link>
                        </li>
                        <li 
                            className='border-b border-liner-color mt-1'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/products">Productos</Link>
                        </li>
                        <li 
                            className='border-b border-liner-color mt-1'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/staff">Empleados</Link>
                        </li>
                    </ul>
                </article>}
            </section>

            <ul className='lg:mt-10 md:flex lg:flex-col gap-4 hidden'>
                <li>
                    <Link to="/inventory">Inventario</Link>
                </li>
                <li>
                    <Link to="/sales">Ventas</Link>
                </li>
                <li>
                    <Link to="/providers">Proveedores</Link>
                </li>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
                <li>
                    <Link to="/staff">Empleados</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Side;