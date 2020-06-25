import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import { auth, createUserProfileDocument } from './firebase/FirebaseUtils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // an open connection which monitors if firebase authentication is changed.
    // if no current login user, user is null.
    // onAuthStateChanged() returns firebase.Unsubscribe()
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // when there is a current user signin
      if (userAuth) {
        // if the current user does not exist in the database, we will create the document.
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              // create an object that contains all data in the snapshot.
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            },
            () => {
              // check if the snapShot is working
              console.log(this.state);
            }
          );
        });
      } else {
        // when there is no current user, set it back to null
        this.setState({ currentUser: userAuth }, () => {
          console.log(this.state);
        });
      }
    });
  }

  componentWillUnmount() {
    // close the observer when the component is unmounted.
    this.unsubscribeFromAuth();
  }

  render() {
    // putting Header out of the Switch can make Header always is always presented and rendered.
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign-in" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
