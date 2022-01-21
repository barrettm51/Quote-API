const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res) => {
    res.send({quote: getRandomElement(quotes)});
});

app.get('/api/quotes', (req, res) => {
    if(!req.query.person) {
      res.send({quotes: quotes});  
    } else {
      const author = req.query.person;
      const quotesByAuthor = quotes.filter(item => item.person === author);
      if(!quotesByAuthor) res.send({quotes: []});
      res.send({quotes: quotesByAuthor});
    }
});

app.post('/api/quotes', (req, res) => {
    if(req.query.person && req.query.quote) {
        quotes.push(req.query);
        res.send({quote: req.query});
    } else {
        res.status(404).send('Please enter a person and a quote to add quote to library.')
    }
});



