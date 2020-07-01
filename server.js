const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        let author = req.query.person;
        let authorQuotes = [];
        for (let i = 0; i < quotes.length; i++) {
            if (quotes[i].person === author) {
                let quote = quotes[i];
                authorQuotes.push(quote);
            }
        }
        res.send({quotes: authorQuotes});
    } else {
        let allQuotes = [];
        for (let i = 0; i < quotes.length; i++) {
            let quote = quotes[i];
            allQuotes.push(quote);
        }
        res.send({quotes: allQuotes});
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        let quote = {quote: req.query.quote, person: req.query.person};
        quotes.push(quote);
        res.status(201).send({quote: quotes[quotes.length - 1]});
    } else {
        res.status(400).send();
    }
});
