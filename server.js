const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(compression());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.post('/payment', (req, res) => {
    const { token, amount } = req.body;
    const body = {
        source: token.id,
        amount: amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        }
        else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

app.listen(port, error => {
    if (error) throw error;
    console.log('Server runing on port ' + port);
});