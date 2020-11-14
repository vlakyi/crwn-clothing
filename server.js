const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// Email API
const sgMail = require('@sendgrid/mail');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(compression());

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

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

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const msg = {
        to: 'kiyashko.vlad1@gmail.com',
        from: email,
        subject: `CRWN CLOTHING contact message from: ${name}`,
        text: message
    };
    
    if(email.includes('@')) {
        try {
            const result = await sgMail.send(msg);
            res.status(result.statusCode).json('Email successfully sent');

        } catch (error) {
            if (error.response) {
                console.error(error.response.body);
                res.status(400).json(error.response.body);
            }
        }
    }
    else {
        res.status(422).json('wrong email address format');
    }
});

app.listen(port, error => {
    if (error) throw error;
    console.log('Server runing on port ' + port);
});