import React from 'react';

import { CustomButtonContainer } from './CustomButtonStyles';

/**
 * children is to show the button context
 * isGoogleSignIn is to identify whether this button is for google signin
 * otherProps takes the rest of button attributes
 */
// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   inverted,
//   ...otherProps
// }) => (
//   <button
//     className={`${inverted ? 'inverted' : ''} ${
//       isGoogleSignIn ? 'google-sign-in' : ''
//     } custom-button`}
//     {...otherProps}
//   >
//     {children}
//   </button>
// );

const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
