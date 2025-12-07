import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h3 className="instructions-title"> Как использовать конвертер</h3>
      
      <div className="instructions-content">
        <div className="instruction-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>Ввод HEX значения</h4>
            <p>Введите цвет в формате HEX, начиная с символа <code>#</code></p>
            <p><strong>Формат:</strong> <code>#RRGGBB</code>, где RR, GG, BB — шестнадцатеричные значения от 00 до FF</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>Автоматическая конвертация</h4>
            <p>Конвертер автоматически преобразует цвет в формат RGB после ввода всех 7 символов</p>
            <p>При неправильном вводе появится сообщение об ошибке</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4>Просмотр результата</h4>
            <p>Результат отобразится в формате RGB и в виде цветного предпросмотра</p>
            <p>Цвет текста автоматически адаптируется для лучшей читаемости</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
