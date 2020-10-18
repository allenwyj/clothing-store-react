import React from 'react';
import { connect } from 'react-redux';

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

import WithSpinner from '../../components/with-spinner/WithSpinner';

import { SignInAndSignUpContainer } from './SignInAndSignUpPageStyles';

const SignInAndSignUpPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

const mapStateToProps = state => ({
  isLoading: state.user.isFetching
});

export default connect(mapStateToProps)(WithSpinner(SignInAndSignUpPage));
