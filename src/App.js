import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Home/Products';
import Yangi from './Yangi';
import NotFound from './components/Home/NotFound';

function App() {
  return (
    <Routes>
      <Route path={"/product/:productId"} element={<Products/>} />
      <Route exact path='/'  element={<Yangi />} />
      <Route path='*' element={<NotFound />} />  
      </Routes>
  );
}

export default App;