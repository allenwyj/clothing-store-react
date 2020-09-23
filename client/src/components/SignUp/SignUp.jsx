import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/FormInput';
import CustomButton from '../form-button/CustomButton';

import { signUpStart } from '../../redux/user/UserAction';

import { SignUpContainer, SignUpTitle } from './SignUpStyles';

const SignUp = ({ signUpStart }) => {
  const [userCredential, setUserCredential] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = userCredential;

  const handleSubmit = async event => {
    event.preventDefault();

    // check if password and confirmPassword doesn't match
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    signUpStart({ email, password, displayName });
  };

  const handleChange = e => {
    // name: the name attribute in the input tag
    const { name, value } = e.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email Address"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userProfile => dispatch(signUpStart(userProfile))
});

export default connect(null, mapDispatchToProps)(SignUp);
