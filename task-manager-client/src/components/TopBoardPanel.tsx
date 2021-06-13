import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DisplaySettings from '../models/enums/DisplaySettings';
import SortSettings from '../models/enums/SortSettings';
import { IApplicationState } from '../store/store';
import ToggleButton from './ToggleButton';
import { changeDetailLevelAction, changeDisplaySettingsAction, changeSortSettingsAction } from '../store/actions/settingsActions';

const TopBoardPanel = (): JSX.Element => {
  const sortSettings = useSelector<IApplicationState, SortSettings>((x) => x.settings.sortSettings);
  const displaySettings = useSelector<IApplicationState, DisplaySettings>((x) => x.settings.displaySettings);
  const detailLevel = useSelector<IApplicationState, number>((x) => x.settings.detailLevel);
  const dispatch = useDispatch();

  const handleSetSortOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(changeSortSettingsAction(Object.keys(SortSettings).indexOf(e.target.value)));
  };

  const handleToggleButtonChange = (newValue: string): void => {
    dispatch(changeDisplaySettingsAction((DisplaySettings as any)[newValue]));
  }

  return (
    <div className="top-panel">
      <Link to="" className="button-dashboard">
        Dashboard
      </Link>
      <div className="top-panel-right">
        {displaySettings === DisplaySettings.Kanban &&
          <>
            <div className="option-section">
              <span className="top-panel-right-title">Detail:</span>
              <form>
                <input
                  className="slider"
                  value={detailLevel}
                  onChange={(e) => {
                    dispatch(changeDetailLevelAction(parseInt(e.target.value)));
                  }}
                  type="range"
                  min="1"
                  max="3"
                  style={{ background: 'lightgray' }}
                />
              </form>
            </div>
            <div className="option-section">
              <span className="top-panel-right-title">Sort:</span>
              <select name="sort" value={sortSettings} onChange={(e) => handleSetSortOption(e)}>
                <option value={SortSettings.Own}>Own</option>
                <option value={SortSettings.Deadline}>Deadline</option>
                <option value={SortSettings.Priority}>Priority</option>
              </select>
            </div>
          </>
        }
        <div className="option-section">
          <span className="top-panel-right-title">Display:</span>
          <ToggleButton
            value1={DisplaySettings[DisplaySettings.Kanban]}
            value2={DisplaySettings[DisplaySettings.Table]}
            chosenValue={DisplaySettings[displaySettings]}
            changeValue={handleToggleButtonChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBoardPanel;
