import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/FormInput';
import CustomButton from '../form-button/CustomButton';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/UserAction';

import { SignInContainer, SignInTitle, ButtonsContainer } from './SignInStyles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredential, setUserCredential] = useState({
    email: '',
    password: ''
  });

  // handelChange() gets called in the sub-component
  // the data from sub-component is passed up.
  const handleChange = event => {
    // event fired, then get name and value from input
    const { value, name } = event.target;

    // dynamically updating the state field
    setUserCredential({ ...userCredential, [name]: value });
  };

  const { email, password } = userCredential;

  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  return (
    <SignInContainer>
      <SignInTitle> I already have an account </SignInTitle>
      <span> Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />

        <ButtonsContainer>
          <CustomButton type="submit"> Sign In </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn={true}
          >
            Sign in with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);
