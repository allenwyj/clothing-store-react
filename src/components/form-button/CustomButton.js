import React from 'react';

import './CustomButton.scss';

/**
 * children is to show the button context
 * isGoogleSignIn is to identify whether this button is for google signin
 * otherProps takes the rest of button attributes
 */
const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
