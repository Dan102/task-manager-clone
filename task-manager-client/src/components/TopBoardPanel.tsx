import React from "react"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import DisplaySettings from "../models/enums/DisplaySettings"
import SortSettings from "../models/enums/SortSettings"
import { changeDetailLevelAction, changeDisplaySettingsAction, changeSortSettingsAction } from "../reducers/settingsReducer";
import { IApplicationState } from "../reducers/store";


const TopBoardPanel = () => {

    const sortSettings = useSelector<IApplicationState, SortSettings>(x => x.settings.sortSettings);
    const displaySettings = useSelector<IApplicationState, DisplaySettings>(x => x.settings.displaySettings);
    const detailLevel = useSelector<IApplicationState, number>(x => x.settings.detailLevel);
    const dispatch = useDispatch();

    const handleSetSortOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(changeSortSettingsAction(Object.keys(SortSettings).indexOf(e.target.value)));
    }

    const handleSetDisplayOption = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeDisplaySettingsAction(Object.keys(DisplaySettings).indexOf(e.target.value)));
    }

    return (
        <div className="top-panel">
            <Link to="" className="button-dashboard">Dashboard</Link>
            <div className="top-panel-right">
                <div className="option-section">
                    <span className="top-panel-right-title">Detail:</span>
                    <form>
                        <input className="slider" value={detailLevel}
                            onChange={e => {dispatch(changeDetailLevelAction(parseInt(e.target.value)));
                        }} type="range" min="1" max="3" style={{background:"lightgray"}} />
                    </form>
                </div>
                <div className="option-section">
                    <span className="top-panel-right-title">Sort:</span>
                    <select name="sort" value={sortSettings} onChange={e => handleSetSortOption(e)}>
                        <option value={SortSettings.Own}>Own</option>
                        <option value={SortSettings.Deadline}>Deadline</option>
                        <option value={SortSettings.Priority}>Priority</option>
                    </select>
                </div>
                <div className="option-section">
                    <span className="top-panel-right-title">Display:</span>
                    <input type="radio" id="graphical" name="display" value={DisplaySettings.Graphical}
                        checked={displaySettings === DisplaySettings.Graphical} onChange={e => handleSetDisplayOption(e)}/>
                    <label htmlFor="graphical">Graphical</label>
                    <input type="radio" id="text" name="display" value={DisplaySettings.Text}
                        checked={displaySettings === DisplaySettings.Text} onChange={e => handleSetDisplayOption(e)}/>
                    <label htmlFor="text">Text</label>
                </div>
            </div>
        </div>
    )
}

export default TopBoardPanel;