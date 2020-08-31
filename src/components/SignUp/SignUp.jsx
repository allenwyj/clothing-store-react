import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase/FirebaseUtils';

import FormInput from '../form-input/FormInput';
import CustomButton from '../form-button/CustomButton';

//import './SignUp.scss';
import { SignUpContainer, SignUpTitle } from './SignUpStyles';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    // check if password and confirmPassword doesn't match
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      // createUserWithEmailAndPassword() returns a promise userCredential
      // destructuring user object from the userCredential object
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // createUserProfileDocument() accepts two objects parameter
      await createUserProfileDocument(user, { displayName });

      // clear the form after the user is created successfully in the db,
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = e => {
    // name: the name attribute in the input tag
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    // destructuring the fields in the state
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <SignUpContainer>
        <SignUpTitle>I do not have an account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email Address"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}

export default SignUp;
