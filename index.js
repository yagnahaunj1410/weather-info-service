const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

app.get('/', (req, res) => {
  res.send('Weather Information Service');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City is required');
  }

  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
