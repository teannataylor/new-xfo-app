import React, { useEffect, useState } from 'react';

function ReviewCard({ review, setProducts }) {
  const { id, user_id, comment } = review;
  const [username, setUsername] = useState('');
  console.log(id)
  console.log(user_id)
  useEffect(() => {
    fetch(`/users/${user_id}/public_show`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error('Error occurred during user fetch:', error);
      });
  }, [user_id]);

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
          console.log('Error deleting review');
        }
      })
      .catch((error) => {
        console.error('Error occurred during review delete:', error);
      });
  };

  return (
    <div className="review-card">
    <p className="username">Username: {username}</p>
    <p>Comment: {comment}</p>
    <button onClick={handleDelete}>Delete</button>
  </div>
  );
}

export default ReviewCard;
