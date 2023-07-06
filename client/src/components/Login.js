import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';

function Login() {
  const { login } = useContext(UserContext);
  const [userObj, setUserObj] = useState({
    username: '',
    password: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setUserObj({
      ...userObj,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(userObj)
      .then(success => {
        if (!success) {
          console.error('Login failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              className="login-input"
              name="username"
              value={userObj.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              className="login-input"
              name="password"
              value={userObj.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;