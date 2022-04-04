const express = require('express');

const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const { loginRoute } = require('./routes/login.route');
const { signupRoute } = require('./routes/signup.route');
const { validateTokenRoute } = require('./routes/validate.token.route');

env.config();
const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.use(bodyParser.json());
app.use('/login', loginRoute);
app.use('/signup  ', signupRoute);
app.use('/validateToken', validateTokenRoute);

app.listen(port, () => {
  console.log(`Server listening at: http://${host}:${port}`);
});
