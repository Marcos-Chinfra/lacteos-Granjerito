import React from 'react';
import Login from '../components/Login'

const Home = () => {
    return (
        <section className='w-full h-full flex flex-col '>
            <main className='p-5 w-screen h-5/6 flex flex-col justify-center lg:flex-row '>
                <article className='flex flex-col mx-auto justify-center w-full lg:w-3/5 max-w-loginLogo'>
                    <figure className='w-36 lg:w-52 mx-auto'>
                        <img src="https://scontent.fgua3-3.fna.fbcdn.net/v/t39.30808-6/277097399_105355782123734_3245400114898271789_n.jpg?_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=be3454&_nc_ohc=-2CqyckP_dwAX_-vwL7&_nc_ht=scontent.fgua3-3.fna&oh=00_AfClqW8-0EZBiC7q-dY9Y5vi4wsnf_R7zqzjpalSuautuQ&oe=64DFA20E" alt="" />
                    </figure>
                    <div className='text-center mx-auto'>
                        <h1 className='text-3xl lg:text-4xl font-bold text-gray-600'>
                            Lácteos Granjerito
                        </h1>
                        <p className='text-lg font-medium text-gray-500'>
                            Tradición familiar
                        </p>
                    </div>
                </article>

                <Login/>
            </main>        
            <footer className='w-full flex justify-center items-center bg-side h-1/6'>
                    <p className='text-xl text-white'>Created with ❤️ by MSCH13</p>
            </footer>
        </section>

    );
}

export default Home;