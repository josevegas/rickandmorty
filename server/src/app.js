const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index.js');

const app = express();

// Trust proxy for rate limiting behind reverse proxies (like Railway, Render, etc.)
app.set('trust proxy', 1);

// Rate limiter for security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo después de 15 minutos",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
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