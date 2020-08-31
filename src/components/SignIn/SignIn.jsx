import React from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../form-button/CustomButton';

import { signInWithGoogle, auth } from '../../firebase/FirebaseUtils';

//import './SignIn.scss';
import { SignInContainer, SignInTitle, ButtonsContainer } from './SignInStyles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  // handelChange() gets called in the sub-component
  // the data from sub-component is passed up.
  handleChange = event => {
    // event fired, then get name and value from input
    const { value, name } = event.target;

    // dynamically updating the state field
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle> I already have an account </SignInTitle>
        <span> Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />

          <ButtonsContainer>
            <CustomButton type="submit"> Sign In </CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn={true}
            >
              Sign in with Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;
