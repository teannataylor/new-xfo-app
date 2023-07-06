import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';

function NewReview({ productId, onAddReview, userId }) {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  console.log(user.id)
  function handleSubmit(e) {
    e.preventDefault();
    console.log('user.id:', user.id);
    console.log('comment:', comment);
    console.log(productId)
    const formData = {
      comment: comment,
      product_id: productId,
      user_id: userId
    };
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create review");
        }
      })
      .then((data) => {
        setComment("");
        setErrors([]);
        onAddReview(data); // Use the onAddReview prop
      })
      .catch((error) => {
        console.error("Error occurred during review creation:", error);
        setErrors(["Failed to create review. Please try again later."]);
      });
  }

  function handleChange(e) {
    setComment(e.target.value);
  }

  function handleAddReviewClick() {
    setShowAddReview(true);
  }

  return (
    <div>
      <h2 className="review-header" onClick={handleAddReviewClick}>
        Add a Review
      </h2>
      {showAddReview && (
        <div className="form-container">
          <form className="add-review-form" onSubmit={handleSubmit}>
            <h2 className="add-review-header">Add New Review</h2>
            <div>
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                id="comment"
                value={comment}
                onChange={handleChange}
              />
            </div>
            {errors.length > 0 &&
              errors.map((err) => (
                <p key={err} style={{ color: "red" }}>
                  {err}
                </p>
              ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewReview;