import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Side = () => {
    const [burgerMenu, setBurgerMenu] = useState(false)

    return (
        <nav className='flex w-screen h-1/5 px-8 justify-around lg:justify-start  lg:h-screen lg:w-1/5 lg:max-w-custom  lg:flex-col items-center lg:py-20  bg-side text-gray-100'>
            <section className='flex items-center lg:flex-col'>
                <img src="../../public/img/0c45b7578338b34dca09d7c73d7b7c83.jpg" alt="" className='w-10 h-10 rounded-full lg:w-20 lg:h-20'/>
                <article className='ml-3 lg:mt-3'>
                    <h4>Marcos Chinchilla</h4>
                    <p>Admin</p>
                </article>
            </section>

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
                        <li 
                            className='border-b border-liner-color mt-1'
                            onClick={()=> {setBurgerMenu(!burgerMenu)}}
                        >
                            <Link to="/production">Producción</Link>
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