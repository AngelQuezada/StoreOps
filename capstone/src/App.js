import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MiniDrawer from './components/shared/navBar.jsx';
import Home from './components/Home/home';
import ContactForm from './components/purchaseToSale/generateInventory';
import VendorInventory from './components/purchaseToSale/VendorInventory'

function App() {
  return (
    <Router>
      <div >
        <MiniDrawer />
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes> 
            <Route path="inventory" element={<ContactForm/>}/>
          </Routes>
          <Routes>
          <Route path="/vendor-inventory/:vendor" element={<VendorInventory/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
