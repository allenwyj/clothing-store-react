import styled, { css } from 'styled-components';

// regular button style
const buttonStyles = css`
  background-color: black;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 0;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

// it will check what kind of the button is and append the extra styles for the button.
const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  margin-bottom: 20px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Noto Sans';
  font-weight: bolder;
  border: none;
  border-radius: 2em;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
