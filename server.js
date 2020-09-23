const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// instantiate a new express application
const app = express();
const port = process.env.PORT || 5000; // server port

// any incoming requests will be processed their body tag and convert it to JSON
app.use(bodyParser.json());
// ensure that the URL strings coming in or passing out will not contain any space or symbol
app.use(bodyParser.urlencoded({ extended: true }));

// check to make sure the request's origin is the same (front-end and back-end),
// this allows that we are able to make requests from our front-end to back-end
app.use(cors());

// serving our own web server
if (process.env.NODE_ENV === 'production') {
  // static: it allows us to serve a certain file inside of this URL that we pass to it
  // __node: it tells us what directory we're currently in
  app.use(express.static(path.join(__dirname, 'client/build')));

  // any url that we get, send our index.html to them
  app.get('*', function (req, resp) {
    resp.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

// a post route that receives an actual request from the client-side to another route: /payment
app.post('/payment', (req, resp) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'AUD'
  };

  stripe.charges.create(body, (stripeErr, stripeResp) => {
    if (stripeErr) {
      resp.status(500).send({ error: stripeErr });
    } else {
      resp.status(200).send({ success: stripeResp });
    }
  });
});
