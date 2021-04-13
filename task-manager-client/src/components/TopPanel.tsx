import React from "react"
import { DisplayOptions, SortOptions } from "./Board";

interface ITopPanelProps {
    detailLevel: number;
    sortOption: SortOptions;
    displayOption: DisplayOptions;
    setDetailLevel: React.Dispatch<React.SetStateAction<number>>;
    changeSortOption: (newSortOption: SortOptions) => void;
    setDisplayOption: (newDisplayOption: DisplayOptions) => void;
}

const TopPanel = ({detailLevel, sortOption, displayOption,
     setDetailLevel, changeSortOption, setDisplayOption}: ITopPanelProps) => {

    const handleSetSortOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        changeSortOption(Object.keys(SortOptions).indexOf(e.target.value))
    }

    const handleSetDisplayOption = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDisplayOption(Object.keys(DisplayOptions).indexOf(e.target.value))
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
            <div className="option-section">
                <span className="top-panel-title">Display:</span>
                <input type="radio" id="graphical" name="display" value={DisplayOptions.Graphical}
                    checked={displayOption === DisplayOptions.Graphical} onChange={e => handleSetDisplayOption(e)}/>
                <label htmlFor="graphical">Graphical</label>
                <input type="radio" id="text" name="display" value={DisplayOptions.Text}
                    checked={displayOption === DisplayOptions.Text} onChange={e => handleSetDisplayOption(e)}/>
                <label htmlFor="text">Text</label>
            </div>
        </div>
    )
}

export default TopPanel;