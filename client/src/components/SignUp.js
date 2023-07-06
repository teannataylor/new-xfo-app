import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';

function SignUp() {
  const { signup } = useContext(UserContext);
  const [userObj, setUserObj] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(userObj);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="signup-page" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={userObj.username} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={userObj.password} onChange={handleInputChange} />
      </label>
      <label>
        Password Confirmation:
        <input
          type="password"
          name="password_confirmation"
          value={userObj.password_confirmation}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;