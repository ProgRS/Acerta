import React from 'react';
import './style.css'
import logo from '../../assets/logo.svg'
const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="Logo"/>
    </header>
  );
}

export default Header;