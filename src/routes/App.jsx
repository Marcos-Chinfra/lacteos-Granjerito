import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppContext from '../context/AppContext';
import useSalesHook from '../hooks/useSalesHook';
import Layout from '../containers/Layout';
import NotFound from '../pages/NotFound';
import Inventory from '../pages/Inventory';
import Home from '../pages/Home';
import ProductsList from '../pages/ProductsList';
import Providers from '../pages/Providers';
import Sales from '../pages/Sales';
import Staff from '../pages/Staff';
import SingUp from '../pages/SingUp';
import Production from '../pages/Production';
import UpdateSale from '../pages/UpdateSale';
import '../style/index.css';


function App() {
  const salesHook = useSalesHook();
  return (
    <AppContext.Provider value={salesHook}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/inventory' element={<Inventory/>} />
            <Route exact path='/sales' element={<Sales/>} />
            <Route exact path='/products' element={<ProductsList/>} />
            <Route exact path='/providers' element={<Providers/>} />
            <Route exact path='/staff' element={<Staff/>} />
            <Route exact path='/production' element={<Production/>} />
            <Route exact path='/sing-up' element={<SingUp/>} />
            <Route exact path='/inventory' element={<Inventory/>} />
            <Route exact path='/update-sale' element={<UpdateSale/>} />
            <Route exact path='*' element={<NotFound/>} />
          </Routes>
        </Layout>
        </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
