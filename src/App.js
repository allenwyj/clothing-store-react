import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';

import Header from './components/header/Header';

import { selectCurrentUser } from './redux/user/UserSelectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // getting dispatching actions object
    //const { setCurrentUser } = this.props;
    /* REFACTORING FOR USING redux-saga
    // an open connection which monitors if firebase authentication is changed.
    // if no current login user, userAuth is null.
    // onAuthStateChanged() returns firebase.Unsubscribe()
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // when there is a current user signin
      if (userAuth) {
        // if the current user does not exist in the database, we will create the document.
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // dispatching user to store state.
          setCurrentUser({
            // create an object that contains all data in the snapshot.
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        // when there is no current user, set it back to null
        setCurrentUser(userAuth); // we just need to pass our currentUser in.
      } 

      // TODO: ONLY FOR DEVELOPMENT PURPOSE!!!
      // adding collection and documents into the firebase
      // we only add the values that we want to be stored(title and items)
      // addCollectionAndDocuments(
      //   'collections',
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
    }); */
  }

  componentWillUnmount() {
    // close the observer when the component is unmounted.
    this.unsubscribeFromAuth();
  }

  render() {
    // putting Header out of the Switch can make Header always is always presented and rendered.
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/sign-in"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// Dispatch accepts action objects and pass it to every reducer
// const mapDispatchToProps = dispatch => ({
//   // setCurrentUser() returns an Action object, each field is a function
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

export default connect(mapStateToProps)(App);
