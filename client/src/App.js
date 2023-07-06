import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/user';
import Homepage from './components/Homepage';
import SingleProduct from './components/SingleProduct';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import AddReview from './components/AddReview';

import './App.css';

function App() {
  const { getCurrentUser, user } = useContext(UserContext);
  const [products,setProducts] = useState([]);

  useEffect(() => {
    fetch("/products")
    .then(r => r.json())
    .then(products => setProducts(products))
  }, [])
  
  console.log(products)

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  function onProductUpdate(updatedProduct){
    setProducts(products.map(
      product => product.id === updatedProduct.id ? updatedProduct : product ))
  }
  

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/homepage" element={<Homepage products={products} setProducts={setProducts}/>} />
        <Route path="/products" element={<Homepage products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<SingleProduct products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id/edit" element={<EditProduct onProductUpdate={onProductUpdate}/>}/>
        <Route path="/products/new" element={<AddProduct  setProducts={setProducts}/>}/>
        <Route path="/reviews/new" element={<AddReview />}/>
      </Routes>
    </div>
  );
}

export default App;
