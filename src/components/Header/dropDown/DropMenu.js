import React, { useState, useRef, useEffect } from 'react';
import SwitchContainer, { renderListData } from './switch/Switch';
import useScroll from './switch/Scroll';
import useDataApi from '../api/ApiData';
import { ReactComponent as Search } from '../../img/search.svg'
import './Dropdown.css';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorites, setFavorites] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [favorit, setFavoritState] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const dropdownRef = useRef(null);
  const { apiData } = useDataApi();
  const { containerRef, startIndex, endIndex } = useScroll({
    itemCount: filterData.length,
    itemHeight: 35,
  });

  useEffect(() => {
    if (apiData) {
      setCoinsData(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    const dataToFilter = isFavorites ? favorit : coinsData;
    let filtered = dataToFilter;
    if (searchQuery) { 
      filtered = filtered.filter(el => el.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilterData(filtered.sort().filter(el => el.trim() !== ''));
  }, [searchQuery, isFavorites, coinsData, favorit]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  };

  const clearInput = () => {
    setSearchQuery('');
  }

  const handleClickSwitch = ({ btn }) => {
    setFavorites(btn === 'fav-btn');
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };

  const FavoritCoin = (coin) => {
    setFavoritState(prevFavorites =>
      prevFavorites.includes(coin)
        ? prevFavorites.filter(el => el !== coin)
        : [...prevFavorites, coin]
    );
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
        <div>
        <button className='navbar-item button'
          onClick={toggleDropdown}
        >
          <Search className='search-btn-icon' />
          <span>Search</span>
        </button>
      </div>
      {isOpen && (
        <div className="dropdown-content" onClick={handleClickInside}>
          <div className='input-search-btn'>
            <Search className='serchImg' />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button class="clear-btn" onClick={clearInput}></button>
          </div>
          <SwitchContainer  
            isFavorites={isFavorites}
            handleClickSwitch={handleClickSwitch}/>
          <div className="dropdown-items" ref={containerRef}>
             
            <ul
              className='coinsList'
            >
              {renderListData(filterData, FavoritCoin, favorit, searchQuery, startIndex, endIndex)}
            </ul>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
