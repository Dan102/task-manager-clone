import React from 'react'
import ArrayHelper from '../helpers/arrayHelper';

interface IPriorityBarProps {
  priority: number;
  maxPriority: number;
}

const PriorityBar = ({
  priority,
  maxPriority
}: IPriorityBarProps): JSX.Element => {

  return (
    <div className="priority-bar">
      {
        ArrayHelper.getRange(1, maxPriority).map(index =>
          <div key={index} className={index <= (maxPriority + 1 - priority) ? 'priority-bar-active' : ''}></div>
        )
      }
    </div>
  )
}

export default PriorityBar;