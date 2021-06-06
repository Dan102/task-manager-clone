import React from 'react'

interface IToggleButtonProps {
  value1: string;
  value2: string;
  chosenValue: string;
  changeValue: (newValue: string) => void;
}

const ToggleButton = ({
  value1,
  value2,
  chosenValue,
  changeValue,
}: IToggleButtonProps): JSX.Element => {

  return (
    <div className="toggle-button">
      <button onClick={() => { changeValue(value1) }}
        className={chosenValue === value1 ? 'active' : ''}
      >{value1}</button>
      <button onClick={() => {changeValue(value2)}}
        className={chosenValue === value2 ? 'active' : ''}
      >{value2}</button>
    </div>
  )
}

export default ToggleButton;