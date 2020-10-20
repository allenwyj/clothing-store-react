import React from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    // normally only saving an error flag
    this.state = {
      hasErrored: false
    };
  }

  // a lifecycle method that gets the error if its children throws any error
  static getDerivedStateFromError(error) {
    // do something with the error

    // has to return an object that sets local state, and the component is aware of there is an error
    return { hasErrored: true };
  }

  // allowing to catch the error and get info about error in which component
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    // conditionally render component based on the state
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/Q2BAOd2.png" />
          <ErrorImageText>Sorry, this page is lost</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
