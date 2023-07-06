import React, { useState,useContext } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { UserContext } from '../context/user';
import AddReview from './AddReview';

function SingleProduct({ products, setProducts }) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const product = products.find((r) => r.id === parseInt(id));

  function editProduct() {
    console.log('editing');
  }

  function deleteProduct() {
    fetch(`/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Delete was successful
          setProducts((currentListing) =>
            currentListing.filter((product) => product.id !== parseInt(id))
          );
          // Navigate to /homepage
          navigate('/homepage');
        } else {
          // Handle error case if needed
          console.log('Delete operation failed.');
        }
      })
      .catch((error) => {
        // Handle error case if needed
        console.error('Error occurred during delete:', error);
      });
  }

  function handleAddReview(newReview) {
    // Update the product's reviews with the new review
    const updatedProduct = {
      ...product,
      reviews: [...product.reviews, newReview],
    };

    // Update the products state
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }

  return (
    <div>
      <NavBar />
      {product ? (
        <div>
          <div className="single-product">
            <div className="single-product-image">
              <img src={product.image_url} alt={product.name} />
            </div>
          </div>
          <div className="single-product">
            <p className="product-s-name">{product.name}</p>
            <p className="product-s-brand">{product.brand}</p>
            <p className="product-s-category">{product.category}</p>
            <p className="product-s-price">${product.price}</p>
            <p className="product-s-desc-title">Description:</p>
            <p className="product-s-description">{product.description}</p>
          </div>
          <div className="button-container">
            <Link to={`/products/${id}/edit`}>
              <button onClick={editProduct}>Edit</button>
            </Link>
            <button onClick={deleteProduct}>Delete</button>
          </div>
          <div className="review-container">
  <div className="add-review-container">
    <AddReview productId={product.id} onAddReview={handleAddReview} userId={user.id} />
  </div>
  {product.reviews.map((review) => (
    <ReviewCard key={review.id} comment={review.comment} review={review} setProducts={setProducts} />
  ))}
</div>
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
}

export default SingleProduct;