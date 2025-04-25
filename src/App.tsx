import { useState } from 'react';
import './App.css';

type CalculatorOperation = '+' | '-' | '*' | '/' | '=' | '';

function App() {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<CalculatorOperation>('');
  const [overwrite, setOverwrite] = useState<boolean>(true);

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperation('');
    setOverwrite(true);
  };

  const deleteLastChar = () => {
    if (currentValue.length === 1) {
      setCurrentValue('0');
      setOverwrite(true);
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const addDigit = (digit: string) => {
    if (currentValue === '0' || overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
  };

  const addDecimal = () => {
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }

    if (!currentValue.includes('.')) {
      setCurrentValue(`${currentValue}.`);
    }
  };

  const selectOperation = (op: CalculatorOperation) => {
    if (previousValue) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperation(op);
    setOverwrite(true);
  };

  const calculate = (): string => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
  
    if (isNaN(prev) || isNaN(current)) return currentValue;
  
    let result = 0;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return currentValue;
    }
  
    return result.toString();
  };

  const equals = () => {
    if (!operation || !previousValue) return;

    const result = calculate();
    setCurrentValue(result);
    setPreviousValue('');
    setOperation('');
    setOverwrite(true);
  };

  return (
    <div style={{width: "100vw"}}>
      <div className="calculator">
        <div className="display">
          <div className="previous">
            {previousValue} {operation}
          </div>
          <div className="current">{currentValue}</div>
        </div>

        <button className="span-2" onClick={clear} style={{color: "black"}}>
          AC
        </button>
        <button onClick={deleteLastChar} style={{backgroundColor: "red"}}>DEL</button>
        <button onClick={() => selectOperation('/')}>÷</button>

        <button onClick={() => addDigit('7')} style={{color: "black"}}>7</button>
        <button onClick={() => addDigit('8')} style={{color: "black"}}>8</button>
        <button onClick={() => addDigit('9')} style={{color: "black"}}>9</button>
        <button onClick={() => selectOperation('*')}>×</button>

        <button onClick={() => addDigit('4')} style={{color: "black"}}>4</button>
        <button onClick={() => addDigit('5')} style={{color: "black"}}>5</button>
        <button onClick={() => addDigit('6')} style={{color: "black"}}>6</button>
        <button onClick={() => selectOperation('-')}>-</button>

        <button onClick={() => addDigit('1')} style={{color: "black"}}>1</button>
        <button onClick={() => addDigit('2')} style={{color: "black"}}>2</button>
        <button onClick={() => addDigit('3')} style={{color: "black"}}>3</button>
        <button onClick={() => selectOperation('+')}>+</button>

        <button onClick={() => addDigit('0')} style={{color: "black"}}>0</button>
        <button onClick={addDecimal} style={{color: "black"}}>.</button>
        <button className="span-2" onClick={equals}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;