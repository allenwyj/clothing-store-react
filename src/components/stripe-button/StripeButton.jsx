import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // price needs to be in cents
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HFwAEF8dsjlKo5ZPbmbvjtDctpsor0lvdzStoRe94tM49sjnQNAYBje5uWAXK8pOCCKVEUaX0frHt0JvwLnJPNR00O9s1L0GE';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="My Clothing Pty. Ltd."
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

export default StripeCheckoutButton;
