import React from 'react';
import './ColorPreview.css';

const ColorPreview = ({ hexValue, rgbValue, contrast, isValid }) => {
  const textColor = contrast === 'dark' ? '#333' : '#fff';

  return (
    <div className="preview-container">
      <h3 className="preview-title">Результат конвертации:</h3>
      
      <div className="result-card">
        <div 
          className="rgb-value" 
          style={{ 
            color: textColor, 
            backgroundColor: hexValue 
          }}
        >
          {isValid ? rgbValue : 'Введите корректный HEX-код'}
        </div>
        
        <div 
          className="color-preview" 
          style={{ backgroundColor: hexValue }}
        >
          <div className="color-info">
            <span className="hex-label" style={{ color: textColor }}>
              HEX: <strong>{hexValue}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
