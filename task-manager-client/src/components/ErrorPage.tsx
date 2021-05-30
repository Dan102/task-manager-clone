import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1>Error Occurred</h1>
      <h2>
        We did our best but error occurred nonetheless. At least, let this experience remind you that everything in life
        is temporary.
      </h2>
      <h3>
        If you think that today is your lucky day, you can try going <Link to="/">back to dashboard</Link> to find out{' '}
        <br /> if the source of the error had enough time to magically disappear.
      </h3>
      <div>
        <span className="error-page-rainbow" role="img" aria-label="rainbow-left">
          🌈🌈🌈
        </span>
        <span className="error-page-rainbow-rotated" role="img" aria-label="rainbow-right">
          🌈🌈🌈
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
