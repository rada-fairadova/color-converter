import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">Конвертер цветов</h1>
        <p className="subtitle">HEX → RGB</p>
      </div>
    </header>
  );
};

export default Header;
