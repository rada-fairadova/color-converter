export const isValidHex = (hex) => {
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    return hexRegex.test(hex);
  };
  
  export const hexToRgb = (hex) => {
    if (!isValidHex(hex)) return null;
    
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    return { r, g, b };
  };
  
  export const formatRgb = (rgb) => {
    if (!rgb) return '';
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };
  
  export const getContrastColor = (rgb) => {
    if (!rgb) return 'dark';
    const brightness = Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);
    return brightness > 125 ? 'dark' : 'light';
  };
