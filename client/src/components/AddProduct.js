import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from './NavBar'


// t.string "name"
// t.string "image_url"
// t.string "brand"
// t.string "category"
// t.text "description"
// t.float "price"

function AddProduct({setProducts}) {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const defaultFormData = {
    name: "",
    image_url: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
  };

  const [formState, setFormState] = useState(defaultFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   //prevents default form behavior

  console.log('hello') // make sure button works 

  //configuration object to pass through fetch
  const config = {
    method: "POST",
    headers: {
      //indicates to the server that the request body contains JSON data
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
    //this takes the formState data and turns it into stringdata since you can only send strings(?) across the internet
    body: JSON.stringify(formState),
  };

  fetch("/products", config)
  .then((res) => res.json()) //parses the data/response once it is resolved  into consumable JSON
  .then((data) => {
    if (!data.errors) {
      setProducts((prevState) => [...prevState, data]); // 2nd promise receives the data and is used to set state
      navigate('/homepage');
    } else {
      setErrorMessages(data.errors);
    }
  })
}
  return (
    <div>
      <NavBar />
      <div>
      <div className="error-container">
       {errorMessages.map((error, index) => (
        <p key={index}>{error}</p>
         ))}
       </div>

        <form className='form-container' onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />

          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formState.image_url}
            onChange={handleChange}
          />

          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formState.brand}
            onChange={handleChange}
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formState.category}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formState.price}
          onChange={handleChange}
        />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}


export default AddProduct;
