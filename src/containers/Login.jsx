import React from 'react';

const Login = () => {
    return (
        <div className='bg-bg-login h-screen w-screen flex items-center justify-center'>
            <form className='bg-form-login h-screen w-screen max-w-2xl max-h-96 rounded flex justify-center flex-col items-center gap-4'>
                <label htmlFor="" className='flex flex-col w-3/5'>
                    Usuario:
                    <input type="text" className=' h-16 p-2 border border-red rounded w-full ' />
                </label>
                
                <label htmlFor="" className='flex flex-col w-3/5 '>
                    Contraseña:
                    <input type="password" className='w-full h-16 p-2 border border-red rounded' />
                </label>
                <button type="button" className='w=3/5'>Log in</button>
            </form>
        </div>
    );
}

export default Login;