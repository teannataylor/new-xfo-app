import React from 'react'
import NavBar from './NavBar'
import ProductCard from './ProductCard'


function Homepage({products}) {
    console.log(products)

    const renderProducts = products.map((product) => <ProductCard product={product} key={product.id}/> )
  return (
    <div>
            <NavBar/>
            
      <h1 className="title">Welcome to Xfoliant!</h1>  
      <div className='product-card-container'>
        {renderProducts}
      </div>
        </div>
  )
}

export default Homepage