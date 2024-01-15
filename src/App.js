import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import ProductsList from "./Pages/ProductsList";
import ProductsAdd from "./Pages/ProductsAdd";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ProductsList />}/>
        <Route path="/ProductsAdd" exact element={<ProductsAdd />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
  
export default App;
