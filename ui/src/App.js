
import './App.css';
import HeaderComponent from './components/header';
import NavBarComponent from './components/navbar';
import CartComponent from "./components/Cart/index";
import Login from "./login";
import Signup from "./signup";
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    
    <>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path = "/" element = {<NavBarComponent />}/>
          <Route path = "/cart" element = {<CartComponent />}/>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/signup" element = {<Signup />}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
