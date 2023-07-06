import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function EditProduct({ onProductUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    image_url: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    console.log('ID:', id);
    fetch(`/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCurrentData(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('ID:', id);
    fetch(`/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(currentData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error updating product'); // Throw an error for non-200 responses
        }
      })
      .then((data) => {
        onProductUpdate(data);
        setSubmitted(true);
        navigate(`/products/${id}`);
      })
      .catch((error) => {
        setErrorMessage([error.message]); // Set the error message to be displayed
      });
  }
  

  function handleChange(e) {
    const key = e.target.name;
    setCurrentData({
      ...currentData,
      [key]: e.target.value,
    });
  }

  return (
    <div>
      <NavBar />
      <div className="edit-product-container">
        <form onSubmit={handleSubmit} className="edit-product-form">
          <div className="error-container">
            {errorMessage.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.name}
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand" className="form-label">
              Product Brand
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.brand}
              type="text"
              name="brand"
              id="brand"
              placeholder="Product Brand"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Product Category
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.category}
              type="text"
              name="category"
              id="category"
              placeholder="Product Category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.description}
              type="text"
              name="description"
              id="description"
              placeholder="Product Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Product Price
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.price}
              name="price"
              id="price"
              placeholder="Product Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image URL
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              value={currentData.image_url}
              type="text"
              name="image_url"
              id="image"
              placeholder="Image URL"
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
