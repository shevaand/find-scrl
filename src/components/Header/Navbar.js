import React, { useState } from 'react';
import Dropdown from './dropDown/DropMenu.js';
import './navbar.css';

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const clickHandler = (index) => {
    setActiveIndex(index);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-links">
          <span
            href="#" 
            className={`first navbar-item ${activeIndex === 0 ? 'active' : ''}`} 
            onClick={() => clickHandler(0)}
          >
            Doge
          </span>
          <div className="vertical-line"></div>
          <span
            href="#" 
            className={`navbar-item ${activeIndex === 1 ? 'active' : ''}`} 
            onClick={() => clickHandler(1)}
          >
            btc
          </span>
          <span
            href="#" 
            className={`navbar-item ${activeIndex === 2 ? 'active' : ''}`} 
            onClick={() => clickHandler(2)}
          >
            eth
          </span>
          <span
            href="#" 
            className={`navbar-item ${activeIndex === 3 ? 'active' : ''}`} 
            onClick={() => clickHandler(3)}
          >
            xtz
          </span>
          <div className="vertical-line"></div>
        </div>
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          
          <Dropdown  title='Serch' />
        </form>
      </nav>
    </header>
  );
};

export default Navbar;
