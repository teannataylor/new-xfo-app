import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <p className="product-name">{product.name}</p>
      <p className="product-brand">{product.brand}</p>
      <p className="product-price">${product.price}</p>
      <Link to={`/products/`+ product.id}><button className='font-serif'>View</button> </Link>
    </div>
  );
}

export default ProductCard;
