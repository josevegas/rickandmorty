const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index.js');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: ['https://rickandmorty-one-beryl.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));
app.use("/", router);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
})

module.exports = app;