import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './WithSpinnerStyles';

/**
 * WithSpinner component will take a component as parameter, and pass it into
 * another arrow function which will destructure its props (isLoading and othersProps
 * is the props of the WrappedComponent).
 */
const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  return Spinner;
};

export default WithSpinner;
