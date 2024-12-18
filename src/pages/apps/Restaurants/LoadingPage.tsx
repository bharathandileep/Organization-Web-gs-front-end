// src/components/LoadingPage.tsx
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
