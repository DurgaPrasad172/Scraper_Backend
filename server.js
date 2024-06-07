const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrape= require('./scraper');

const app = express();
const port = process.env.PORT || 3201;

app.use(cors());
app.use(bodyParser.json());

let articles = [];

app.post('/scrape', async (req, res) => {
  const topic = req.body.topic;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    articles = await scrape.scrapeMediumArticles(topic);
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error scraping articles:', error);
    res.status(500).json({ error: 'Failed to scrape articles' });
  }
});

app.get('/articles', (req, res) => {
  res.status(200).json(articles);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:3201${port}`); // Change * to your allowed origin(s)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
