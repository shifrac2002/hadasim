import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import AllCustomers from './components/AllCustomers'
import UpdateCustomer from './components/UpdateCustomer';
import CustomerInfo from './components/CustomerInfo';

function App() {
  {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<AllCustomers/>} />
          <Route path="/CreateOrUpdateCustomer" element={<UpdateCustomer/>} />
          <Route path="/CustomerInfo" element={<CustomerInfo/>}/>
        </Routes>
      </Router>
    );
  }
}
export default App;