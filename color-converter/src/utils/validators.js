export const validateHex = (value) => {
    if (!value) return { isValid: false, message: 'Введите HEX значение' };
 
    const formattedValue = value.startsWith('#') ? value : `#${value}`;
  
    if (formattedValue.length < 7) {
      return { 
        isValid: false, 
        message: 'Введите полный HEX код (например, #FF0000)',
        formattedValue 
      };
    }
  
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    const isValid = hexRegex.test(formattedValue);
  
    return {
      isValid,
      message: isValid ? '' : 'Некорректный формат HEX. Используйте #RRGGBB',
      formattedValue: isValid ? formattedValue.toUpperCase() : formattedValue
    };
  };
