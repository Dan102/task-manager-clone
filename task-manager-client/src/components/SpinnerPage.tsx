import React from 'react';

interface ISpinnerPageProps {
    component: JSX.Element;
    isLoading: boolean;
}

const SpinnerPage = ({ component, isLoading }: ISpinnerPageProps) => {
    return (
        <>
            {component}
            {isLoading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <div className="spinner-text">Loading...</div>
                </div>
            )}
        </>
    );
};

export default SpinnerPage;
