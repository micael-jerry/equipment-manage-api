const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes/index.routes');
const { notFound } = require('./src/middleware/notfound.middleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.use(notFound);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

module.exports = app;
