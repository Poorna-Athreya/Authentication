const express = require('express');

const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const { authRoute } = require('./routes/login.route');

env.config();
const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.json());
app.use('/login', authRoute);

app.listen(port, () => {
  console.log(`Server listening at: http://${host}:${port}`);
});
