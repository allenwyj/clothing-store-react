import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

// import HomePage from './pages/homepage/HomePage';
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/Header';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { selectCurrentUser } from './redux/user/UserSelectors';
import { checkUserSession } from './redux/user/UserAction';

// Declaring Lazy Loading for different pages.
const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/SignInAndSignUpPage')
);

const App = ({ checkUserSession, currentUser }) => {
  // componentDidMount

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // putting Header out of the Switch can make Header always is always presented and rendered.
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/sign-in"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// Dispatch accepts action objects and pass it to every reducer
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
