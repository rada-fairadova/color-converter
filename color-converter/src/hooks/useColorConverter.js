import { useState, useCallback } from 'react';
import { hexToRgb, formatRgb, isValidHex, getContrastColor } from '../utils/colorConverter';

export const useColorConverter = (initialColor = '#FFFFFF') => {
  const [hexValue, setHexValue] = useState(initialColor);
  const [rgbValue, setRgbValue] = useState(() => {
    const rgb = hexToRgb(initialColor);
    return formatRgb(rgb);
  });
  const [error, setError] = useState('');
  const [contrast, setContrast] = useState('dark');

  const convertColor = useCallback((hex) => {
    setError('');

    if (hex.length !== 7) {
      setError('Введите 7 символов (включая #)');
      return;
    }

    if (!isValidHex(hex)) {
      setError('Некорректный HEX формат. Используйте #RRGGBB');
      return;
    }

    const rgb = hexToRgb(hex);
    if (rgb) {
      setHexValue(hex);
      setRgbValue(formatRgb(rgb));
      setContrast(getContrastColor(rgb));
    }
  }, []);

  return {
    hexValue,
    rgbValue,
    error,
    contrast,
    convertColor,
    setHexValue
  };
};
