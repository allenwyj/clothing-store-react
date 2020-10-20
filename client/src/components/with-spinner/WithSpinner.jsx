import React from 'react';

import Spinner from '../spinner/spinner.component';

/**
 * WithSpinner component will take a component as parameter, and pass it into
 * another arrow function which will destructure its props (isLoading and othersProps
 * is the props of the WrappedComponent).
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
