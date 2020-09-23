import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';
import { clearCart } from '../../redux/cart/CartAction';

const StripeCheckoutButton = ({ price, dispatch }) => {
  // price needs to be in cents
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HFwAEF8dsjlKo5ZPbmbvjtDctpsor0lvdzStoRe94tM49sjnQNAYBje5uWAXK8pOCCKVEUaX0frHt0JvwLnJPNR00O9s1L0GE';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('succesful payment');
        dispatch(clearCart());
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="My Clothing Pty Ltd"
      currency="AUD"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default connect()(StripeCheckoutButton);
