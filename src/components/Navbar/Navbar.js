import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/signup'>SingUp</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default Navbar;