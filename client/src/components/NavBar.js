import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';



function NavBar() {
  const {logout, user} = useContext(UserContext);

  return (
   <>
   <nav className='navbar'>
    <div className='container flex-space'>
    <div className='user-nav-bar'>{user.username}</div>

    <ul className='nav-menu active'>
    <li>
        <Link to='/homepage'>Home</Link>
        <Link to='/products'>All Products</Link>
        <Link to='/products/new'>Add Product</Link>
        <Link to='/' onClick={logout}>Logout</Link>
        </li>

    </ul>

    </div>



   </nav>
   
   
   </>
  )
}

export default NavBar