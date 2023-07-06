import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1 className="welcome-content">Welcome!</h1>
      <Login />
      <p className="welcome-content">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default WelcomePage;




