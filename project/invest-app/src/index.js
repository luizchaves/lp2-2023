import express from 'express';
import morgan from 'morgan';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const investiments = [
  {
    name: 'Tesouro Selic 2029',
    value: 1000,
  },
  {
    name: 'Tesouro Selic 2029',
    value: 500,
  },
];

const server = express();

server.use(morgan('tiny'));

server.use(express.static('public'));

server.get('/investiments', (req, res) => {
  res.json(investiments);
});

// 404 handler
server.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
server.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
