import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../containers/NotFound';
import Inventory from '../containers/Inventory';
import Login from '../containers/Login';
import LoginsStaff from '../containers/LoginsStaff';
import ProductsList from '../containers/ProductsList';
import Providers from '../containers/Providers';
import Sales from '../containers/Sales';
import Staff from '../containers/Staff';
import Supplies from '../containers/Supplies';
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
          <Route exact path='/supplies' element={<Supplies/>} />
          <Route exact path='*' element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
