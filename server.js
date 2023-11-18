const express = require('express');
const cors = require('cors');
const scrape = require('./scrape'); // Importa la función de web scraping

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const results = await scrape();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});
