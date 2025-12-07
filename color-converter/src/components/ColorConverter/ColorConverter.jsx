import React, { useState, useCallback } from 'react';
import { isValidHex, hexToRgb, formatRgb, getContrastColor } from '../../utils/colorConverter';
import ColorPreview from '../ColorPreview/ColorPreview';
import Instructions from '../Instructions/Instructions';
import './ColorConverter.module.css';

const ColorConverter = () => {
  const initialHex = '#FFFFFF';
  const initialRgb = hexToRgb(initialHex);
  const initialContrast = getContrastColor(initialRgb);
  
  const [hexValue, setHexValue] = useState(initialHex);
  const [rgbValue, setRgbValue] = useState(formatRgb(initialRgb));
  const [error, setError] = useState('');
  const [contrast, setContrast] = useState(initialContrast);

  const handleColorChange = useCallback((value) => {
    const cleanValue = value.trim().toUpperCase();
    const formattedValue = cleanValue.startsWith('#') ? cleanValue : `#${cleanValue}`;

    setHexValue(formattedValue);

    if (formattedValue.length !== 7) {
      setError(formattedValue.length < 7 ? 'Введите 7 символов (включая #)' : 'Слишком длинное значение');
      return;
    }

    if (!isValidHex(formattedValue)) {
      setError('Некорректный HEX формат. Используйте #RRGGBB (например: #FF0000)');
      return;
    }

    const rgb = hexToRgb(formattedValue);
    if (rgb) {
      setRgbValue(formatRgb(rgb));
      setContrast(getContrastColor(rgb));
      setError('');
    }
  }, [setHexValue, setRgbValue, setError, setContrast]);

  const handleInputChange = (e) => {
    handleColorChange(e.target.value);
  };

  const handleExampleClick = (example) => {
    handleColorChange(example);
  };

  const handleInputBlur = () => {
    if (!hexValue || hexValue === '#') {
      handleColorChange('#FFFFFF');
    }
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="converter-container">
      <div className="converter-wrapper">
        <div className="input-section">
          <label htmlFor="hexInput" className="label">
            Введите HEX-цвет (формат #RRGGBB):
          </label>
          <input
            type="text"
            id="hexInput"
            className={`input ${error ? 'input-error' : ''}`}
            value={hexValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            maxLength="7"
            placeholder="#FFFFFF"
            aria-describedby={error ? "errorMessage" : undefined}
          />
          
          {error && (
            <div id="errorMessage" className="error-message">
              ⚠️ {error}
            </div>
          )}
          
          {!error && hexValue.length === 7 && isValidHex(hexValue) && (
            <div className="success-message">
              ✓ Корректный HEX-код
            </div>
          )}

          <div className="examples">
            <p className="examples-title">Примеры цветов:</p>
            <div className="example-buttons">
              {[
                { color: '#FF0000', name: 'Красный' },
                { color: '#00FF00', name: 'Зеленый' },
                { color: '#0000FF', name: 'Синий' },
                { color: '#FFFF00', name: 'Желтый' },
                { color: '#FF00FF', name: 'Пурпурный' },
                { color: '#00FFFF', name: 'Бирюзовый' }
              ].map((item) => (
                <button
                  key={item.color}
                  type="button"
                  className="example-button"
                  onClick={() => handleExampleClick(item.color)}
                  style={{ backgroundColor: item.color }}
                  aria-label={`${item.name} цвет ${item.color}`}
                >
                  {item.color}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ColorPreview 
          hexValue={hexValue}
          rgbValue={rgbValue}
          contrast={contrast}
          isValid={!error && hexValue.length === 7}
        />
      </div>

      <Instructions />
    </div>
  );
};

export default ColorConverter;
