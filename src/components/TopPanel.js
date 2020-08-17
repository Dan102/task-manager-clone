import React, {useState} from "react"

const TopPanel = ({detailLevel, sortOption, setDetailLevel, setSortOption}) => {

    return (
        <div className="top-panel">
            <div className="option-section">
                <span className="top-panel-title">Detail:</span>
                <form>
                    <input className="slider" value={detailLevel} onChange={(e) => {
                         setDetailLevel(e.target.value);
                    }} type="range" min="1" max="3" style={{background:"lightgray"}} />
                </form>
            </div>
            <div className="option-section">
                <span className="top-panel-title">Sort:</span>
                <select name="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="Own">Own</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Priority">Priority</option>
                </select>
            </div>
        </div>
    )
}

export default TopPanel;