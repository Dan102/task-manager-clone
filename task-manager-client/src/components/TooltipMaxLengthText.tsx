import React from 'react'
import StringHelper from '../helpers/stringHelper';

interface ITooltipMaxLengthTextProps {
  text: string;
  maxLength: number;
}

const TooltipMaxLengthText = ({
  text,
  maxLength
}: ITooltipMaxLengthTextProps): JSX.Element => {

  return (
    <div className={text.length > maxLength ? "tooltip-container" : ''}>
      {StringHelper.getMaxLengthStringWithEllipsis(text, maxLength)}
      {text.length > maxLength &&
        <div className="tooltip-text">
          {text}
        </div>
      }
    </div>
  )
}

export default TooltipMaxLengthText;