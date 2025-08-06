import React from 'react';
import { Hero } from './components/Hero';
import {Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Hero />} />
        </Routes>
    </div>
  );
};

export default App;
