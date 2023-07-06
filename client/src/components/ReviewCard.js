import React, { useEffect, useState } from 'react';

function ReviewCard({ review, setProducts }) {
  const { id, user_id, comment } = review;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]); // Reset errors when the component re-renders
  }, [id]);

  const handleDelete = () => {
    fetch(`/reviews/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Review deleted');
          // Remove the deleted review from the products state
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) => {
              const updatedReviews = product.reviews.filter((rev) => rev.id !== id);
              return { ...product, reviews: updatedReviews };
            });
            return updatedProducts;
          });
        } else {
          return response.json().then((data) => {
            throw new Error(data.error);
          });
        }
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  return (
    <div className="review-card">
      <div className="error-container">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      <p>Comment: {comment}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ReviewCard;