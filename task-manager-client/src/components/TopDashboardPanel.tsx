import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/actions/authActions';

const TopDashboardPanel = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleSignOutClicked = () => {
    localStorage.clear();
    dispatch(logoutAction());
  };

  return (
    <div className="top-panel-right">
      <button className="button-dashboard" onClick={() => handleSignOutClicked()}>
        Sign out
      </button>
    </div>
  );
};

export default TopDashboardPanel;
