import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await fetch('/me');

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const login = async (userInfo) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUser(data);
        navigate('/homepage');
        return true;
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/logout', {
        method: 'POST',
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signup = async (userInfo) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/');
      } else {
        const errorData = await response.json();
        setSignupError(errorData.message);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getCurrentUser, logout, signup, login, loginError, signupError }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
