import React from 'react'

interface ITooltipMaxLengthTextProps {
  text: string;
  maxLength: number;
}

const TooltipMaxLengthText = ({
  text,
  maxLength
}: ITooltipMaxLengthTextProps): JSX.Element => {


  const getMaxLengthString = (str: string, maxLength: number) => {
    return str.length > maxLength && maxLength > '...'.length ?
      str.slice(0, maxLength - 3) + '...' :
      str;
  }

  return (
    <div className={text.length > maxLength ? "tooltip-container" : ''}>
      {getMaxLengthString(text, maxLength)}
      {text.length > maxLength &&
        <div className="tooltip-text">
          {text}
        </div>
      }
    </div>
  )
}

export default TooltipMaxLengthText;