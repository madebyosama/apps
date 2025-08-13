'use client';

import { useState, useEffect } from 'react';
import styles from './calculator.module.css';

export default function Calculator() {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const buttons = [
    { label: 'AC', type: 'function' },
    { label: '(', type: 'operator' },
    { label: ')', type: 'operator' },
    { label: '÷', type: 'operator' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator' },
    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '⌫', type: 'function' },
    { label: '=', type: 'equals' },
  ];

  const handleClick = (label: string) => {
    if (label === 'AC') {
      setExpression('');
      setResult('');
      return;
    }

    if (label === '⌫') {
      const newExp = expression.slice(0, -1);
      setExpression(newExp);
      tryEval(newExp);
      return;
    }

    if (label === '=') {
      tryEval(expression);
      return;
    }

    const newExp = expression + label;
    setExpression(newExp);

    if (/[0-9)]+$/.test(label) || label === ')') {
      tryEval(newExp);
    }
  };

  const tryEval = (exp: string) => {
    try {
      const safeExp = exp.replace(/×/g, '*').replace(/÷/g, '/');
      const val = eval(safeExp);
      setResult(val.toString());
    } catch {
      setResult('');
    }
  };

  // ✅ Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Map keys to calculator labels
      const keyMap: Record<string, string> = {
        Enter: '=',
        '=': '=',
        Backspace: '⌫',
        Delete: 'AC',
        '*': '×',
        '/': '÷',
      };

      if (keyMap[key]) {
        e.preventDefault();
        handleClick(keyMap[key]);
        return;
      }

      // Allow numbers, operators, parentheses, and dot
      if (/^[0-9+\-().]$/.test(key)) {
        e.preventDefault();
        handleClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression]);

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.expression}>{expression || '0'}</div>
          <div className={styles.result}>{result}</div>
        </div>
        <div className={styles.buttons}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn.label)}
              className={`${styles.button} ${styles[btn.type]}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
