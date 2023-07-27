import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../containers/Layout';
import NotFound from '../pages/NotFound';
import Inventory from '../pages/Inventory';
import Login from '../pages/Login';
import LoginsStaff from '../pages/LoginsStaff';
import ProductsList from '../pages/ProductsList';
import Providers from '../pages/Providers';
import Sales from '../pages/Sales';
import Staff from '../pages/Staff';
import SingUp from '../pages/SingUp';
import '../style/index.css';


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/login-staff' element={<LoginsStaff/>} />
          <Route exact path='/inventory' element={<Inventory/>} />
          <Route exact path='/sales' element={<Sales/>} />
          <Route exact path='/products' element={<ProductsList/>} />
          <Route exact path='/providers' element={<Providers/>} />
          <Route exact path='/staff' element={<Staff/>} />
          <Route exact path='/sing-up' element={<SingUp/>} />
          <Route exact path='*' element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
