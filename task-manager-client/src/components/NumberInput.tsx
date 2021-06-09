import React, { useEffect, useState, useRef } from 'react'

interface INumberInputProps {
  value: number;
  onChange: (result: INumberInputResult) => void;
  min?: number;
  max?: number;
  step?: number;
}

export interface INumberInputResult {
  lastValidResult: number;
  isValid: boolean;
  isFocused: boolean;
}


const NumberInput = ({ value, onChange, min, max, step=1 }: INumberInputProps): JSX.Element => {

  // numbers, floats, negative, empty string
  const NUMBER_REGEX = new RegExp('^-?[0-9]*$');
  enum ChangeDirection {
    UP,
    DOWN
  }
  const INITIAL_MOUSE_HOLD_DELAY = 150;
  const CONTINUOUS_MOUSE_HOLD_DELAY = 40;

  const [inputValue, setInputValue] = useState<string>(String(value));
  const [result, setResult] = useState<INumberInputResult>({
    lastValidResult: value,
    isFocused: false,
    isValid: true,
  });
  const continuousChangeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const continuousChangeInterval = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (Number(inputValue) !== value) {
      setResult({
        ...result,
        isValid: !isNaN(+inputValue) && inputValue !== '',
        lastValidResult: Number(inputValue),
      })
    }
  }, [inputValue])

  useEffect(() => {
    if (result.isValid && result.isFocused) {
      onChange(result)
    }
  }, [result])

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      handleStepChange(ChangeDirection.UP)
    } else if (e.key === 'ArrowDown') {
      handleStepChange(ChangeDirection.DOWN)
    }
  }

  const handleStepChange = (changeDirection: ChangeDirection) => {
    if (inputValue == null || inputValue === '' || isNaN(+inputValue)) {
      return;
    }
    if (changeDirection === ChangeDirection.UP) {
      handleOnChange(Number(inputValue) + step);
    } else if (changeDirection === ChangeDirection.DOWN) {
      handleOnChange(Number(inputValue) - step);
    }
  }

  const handleOnChange = (newValue: string | number): void => {
    if (newValue !== '' && newValue !== '-' && !NUMBER_REGEX.test(String(newValue))) {
      return;
    }

    setInputValue(String(newValue));
    if (newValue === '' || newValue === '-') {
      setResult({ ...result, isValid: false })
      return;
    }

    let newNumberValue = Number(newValue);
    if (min && newNumberValue < min) newNumberValue = min;
    if (max && newNumberValue > max) newNumberValue = max;
    setResult({ ...result, lastValidResult: newNumberValue, isValid: true });
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setResult({ ...result, isFocused: false })
  }

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setResult({ ...result, isFocused: true });
  }

  const handleMouseDown = (changeDirection: ChangeDirection): void => {
    if (continuousChangeInterval.current) clearInterval(continuousChangeInterval.current);
    continuousChangeInterval.current = setTimeout(() => {
      startIncrementing(changeDirection);
    }, INITIAL_MOUSE_HOLD_DELAY);
  }

  const handleMouseUp = (): void => {
    if (continuousChangeInterval.current) clearInterval(continuousChangeInterval.current);
  }

  const startIncrementing = (changeDirection: ChangeDirection): void => {
    continuousChangeInterval.current = setInterval(() => {
      if (inputValue == null || inputValue === '' || isNaN(+inputValue)) return;
      if (changeDirection === ChangeDirection.UP) {
        setInputValue(oldInputValue => String(Number(oldInputValue) + step));
      } else {
        setInputValue(oldInputValue => String(Number(oldInputValue) - step));
      }
    }, CONTINUOUS_MOUSE_HOLD_DELAY)
  }

  return (
    <div className="number-input">
      <input
        type="text"
        onKeyDown={e => handleOnKeyDown(e)}
        onChange={e => handleOnChange(e.target.value)}
        onFocus={e => handleOnFocus(e)}
        onBlur={e => handleOnBlur(e)}
        value={inputValue}
      />
      <div className="number-input-buttons">
        <button
          className="number-input-arrow-up"
          onClick={() => handleStepChange(ChangeDirection.UP)}
          onMouseDown={() => handleMouseDown(ChangeDirection.UP)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseUp()}
        >&lt;</button>
        <button
          className="number-input-arrow-down"
          onClick={() => handleStepChange(ChangeDirection.DOWN)}
          onMouseDown={() => handleMouseDown(ChangeDirection.DOWN)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseUp()}
        >&gt;</button>
      </div>
    </div>
  )
}

export default NumberInput;