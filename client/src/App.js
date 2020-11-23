import React, { lazy, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import Header from './components/header/header.component';
import MobileHeader from './components/mobile-header/mobile-header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import UserActionTypes from './redux/user/user.types';

// Reselect
import { selectCurrentUser } from './redux/user/user.selectors';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const ContactPage = lazy(() => import('./pages/contact/contact.component'));

const App = () => {
  const currentUser = useSelector(selectCurrentUser); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: UserActionTypes.CHECK_USER_SESSION});
  }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyle />
      {/* <Header /> */}
      <MobileHeader />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/signin" render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUpPage />
                )
            } />
            <Route exact path='/contact' component={ContactPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });

// const mapDispatchToProps = dispatch => ({
//   checkUserSession: () => dispatch(checkUserSession())
// });

export default App;
