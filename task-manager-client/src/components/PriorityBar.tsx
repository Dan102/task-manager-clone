import React, { useState } from 'react'
import ArrayHelper from '../helpers/arrayHelper';

interface IPriorityBarProps {
  priority: number;
  maxPriority: number;
  editable?: boolean;
  setPriority?: (newPriority: number) => void;
}

const PriorityBar = ({
  priority,
  maxPriority,
  editable = false,
  setPriority = () => { },
}: IPriorityBarProps): JSX.Element => {

  const [hoveredPriority, setHoveredPriority] = useState<number>(0);

  const getPriorityBarPartClassName = (index: number) => {
    if (editable && index <= hoveredPriority) {
      return 'priority-bar-hover';
    }
    return index <= (priority) ? 'priority-bar-active' : '';
  }

  const changePriority = (newPriority: number) => {
    if (!editable) return;
    setPriority(newPriority)
  }

  return (
    <div className="priority-bar" onMouseLeave={() => setHoveredPriority(0)} style={{ cursor: editable ? 'pointer' : 'default' }}>
      {
        ArrayHelper.getRange(1, maxPriority).map(index =>
          <div onMouseEnter={() => setHoveredPriority(index)} key={index}
            className={getPriorityBarPartClassName(index)}
            onClick={() => changePriority(index)}
          ></div>
        )
      }
    </div>
  )
}

export default PriorityBar;