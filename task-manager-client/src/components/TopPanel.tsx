import React from "react"
import { SortOptions } from "./Board";

interface ITopPanelProps {
    detailLevel: number;
    sortOption: SortOptions;
    setDetailLevel: React.Dispatch<React.SetStateAction<number>>;
    changeSortOption: (newSortOption: SortOptions) => void;
}

const TopPanel = ({detailLevel, sortOption, setDetailLevel, changeSortOption}: ITopPanelProps) => {

    const handleSetSortOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeSortOption(Object.keys(SortOptions).indexOf(e.target.value))
    }

    return (
        <div className="top-panel">
            <div className="option-section">
                <span className="top-panel-title">Detail:</span>
                <form>
                    <input className="slider" value={detailLevel}
                        onChange={e => {setDetailLevel(parseInt(e.target.value));
                    }} type="range" min="1" max="3" style={{background:"lightgray"}} />
                </form>
            </div>
            <div className="option-section">
                <span className="top-panel-title">Sort:</span>
                <select name="sort" value={sortOption} onChange={e => handleSetSortOption(e)}>
                    <option value={SortOptions.Own}>Own</option>
                    <option value={SortOptions.Deadline}>Deadline</option>
                    <option value={SortOptions.Priority}>Priority</option>
                </select>
            </div>
        </div>
    )
}

export default TopPanel;