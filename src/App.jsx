import React from 'react';
import { Hero } from './components/Hero';
import {Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import { Details } from './components/Details';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/details' element={<Details />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </div>
  );
};

export default App;
