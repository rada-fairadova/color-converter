import React, { useState } from 'react';

function App() {
  const [hex, setHex] = useState('#FFFFFF');
  const [rgb, setRgb] = useState('rgb(255, 255, 255)');
  const [error, setError] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#f5f7fa');

  const isValidHex = (hex) => {
    return /^#([A-Fa-f0-9]{6})$/.test(hex);
  };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setHex(value);
    
    if (value.length === 7) {
      if (isValidHex(value)) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        setRgb(`rgb(${r}, ${g}, ${b})`);
        setError('');
        setBackgroundColor(value);
      } else {
        setError('Неверный формат HEX. Используйте #RRGGBB');
        setBackgroundColor('#f5f7fa');
      }
    } else if (value.length > 7) {
      setError('Слишком длинное значение');
      setBackgroundColor('#f5f7fa');
    } else if (value.length > 0) {
      setError('Введите 7 символов (включая #)');
      setBackgroundColor('#f5f7fa');
    } else {
      setError('');
      setBackgroundColor('#f5f7fa');
    }
  };

  const handleExampleClick = (color) => {
    setHex(color);
    if (isValidHex(color)) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setError('');
      setBackgroundColor(color);
    }
  };

  const getTextColor = (hexColor) => {
    if (!isValidHex(hexColor)) return '#333';
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#333' : '#fff';
  };

  const adjustColor = (hex, percent) => {
    if (!isValidHex(hex)) return hex;
    
    let color = hex.replace('#', '');
    
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const textColor = getTextColor(hex);

  const styles = {
    app: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${backgroundColor} 0%, ${adjustColor(backgroundColor, -20)} 100%)`,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      transition: 'background 0.5s ease',
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      backdropFilter: 'blur(10px)',
    },
    header: {
      textAlign: 'center',
      padding: '30px 20px',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '15px',
      marginBottom: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    inputGroup: {
      marginBottom: '25px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '15px',
      fontSize: '18px',
      border: '2px solid #e1e5eb',
      borderRadius: '10px',
      outline: 'none',
      fontFamily: 'monospace',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    inputError: {
      borderColor: '#dc3545',
    },
    error: {
      color: '#dc3545',
      marginTop: '10px',
      padding: '10px',
      background: 'rgba(220, 53, 69, 0.1)',
      borderRadius: '5px',
      borderLeft: '4px solid #dc3545',
    },
    success: {
      color: '#28a745',
      marginTop: '10px',
      padding: '10px',
      background: 'rgba(40, 167, 69, 0.1)',
      borderRadius: '5px',
      borderLeft: '4px solid #28a745',
    },
    result: {
      background: 'rgba(248, 249, 250, 0.8)',
      padding: '25px',
      borderRadius: '10px',
      marginBottom: '25px',
      textAlign: 'center',
      border: '2px dashed rgba(222, 226, 230, 0.7)',
    },
    rgbValue: {
      fontSize: '24px',
      fontWeight: '700',
      fontFamily: 'monospace',
      padding: '15px',
      borderRadius: '5px',
      margin: '15px 0',
    },
    preview: {
      height: '100px',
      borderRadius: '10px',
      marginTop: '20px',
      border: '2px solid rgba(225, 229, 235, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: '600',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },
    examples: {
      marginTop: '25px',
    },
    exampleButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      marginTop: '15px',
    },
    exampleButton: {
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'monospace',
      boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      marginTop: '30px',
      color: '#666',
      fontSize: '14px',
      borderTop: '1px solid rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Конвертер цветов</h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>HEX → RGB • Фон меняется автоматически</p>
        </header>

        <div style={styles.inputGroup}>
          <label htmlFor="hexInput" style={styles.label}>
            Введите HEX-цвет (формат #RRGGBB):
          </label>
          <input
            id="hexInput"
            type="text"
            value={hex}
            onChange={handleChange}
            maxLength="7"
            placeholder="#FFFFFF"
            style={{
              ...styles.input,
              ...(error ? styles.inputError : {})
            }}
          />
          
          {error && (
            <div style={styles.error}>⚠️ {error}</div>
          )}
          
          {!error && hex.length === 7 && isValidHex(hex) && (
            <div style={styles.success}>✓ Корректный HEX-код • Фон изменен</div>
          )}
          
          {hex.length < 7 && hex.length > 0 && !error && (
            <div style={{ color: '#ff9800', marginTop: '10px', padding: '10px', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '5px', borderLeft: '4px solid #ff9800' }}>
              Введите 7 символов для изменения фона
            </div>
          )}
        </div>

        <div style={styles.result}>
          <h3 style={{ color: '#555', marginBottom: '15px' }}>RGB представление:</h3>
          <div style={{
            ...styles.rgbValue,
            color: textColor,
            backgroundColor: hex,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            {isValidHex(hex) && hex.length === 7 ? rgb : 'rgb(255, 255, 255)'}
          </div>
          <div style={{
            ...styles.preview,
            backgroundColor: hex,
            color: textColor,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            Предпросмотр цвета
          </div>
        </div>

        <div style={styles.examples}>
          <p style={{ color: '#555', fontWeight: '500', marginBottom: '15px' }}>
            Быстрый выбор цвета (меняет фон):
          </p>
          <div style={styles.exampleButtons}>
            {[
              { color: '#FF0000', name: 'Красный' },
              { color: '#00FF00', name: 'Зеленый' },
              { color: '#0000FF', name: 'Синий' },
              { color: '#FFFF00', name: 'Желтый' },
              { color: '#FF00FF', name: 'Пурпурный' },
              { color: '#00FFFF', name: 'Бирюзовый' },
              { color: '#FFA500', name: 'Оранжевый' },
              { color: '#800080', name: 'Фиолетовый' },
              { color: '#008080', name: 'Темно-бирюзовый' }
            ].map((item) => (
              <button
                key={item.color}
                style={{
                  ...styles.exampleButton,
                  backgroundColor: item.color
                }}
                onClick={() => handleExampleClick(item.color)}
                title={`Выбрать ${item.name} цвет`}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
                }}
              >
                {item.color}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: '10px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Как работает конвертер:</h4>
          <ul style={{ color: '#555', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li>Введите любой HEX-цвет в формате #RRGGBB</li>
            <li>После ввода 7 символов фон страницы автоматически изменится</li>
            <li>Конвертер покажет RGB-представление цвета</li>
            <li>Используйте кнопки для быстрого выбора популярных цветов</li>
          </ul>
        </div>

        <footer style={styles.footer}>
          <p>Конвертер цветов HEX → RGB • Фон меняется автоматически • {new Date().getFullYear()}</p>
          <p style={{ marginTop: '10px', fontSize: '12px', opacity: '0.7' }}>
            Текущий фон: {backgroundColor} • RGB: {rgb}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
