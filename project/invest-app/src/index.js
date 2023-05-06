import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { investments } from './data/investments.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const server = express();

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.get('/investments', (req, res) => {
  res.json(investments);
});

server.post('/investments', (req, res) => {
  const investment = req.body;

  const id = uuidv4();

  if (investment) {
    investments.push({ ...investment, id });

    res.json(investment);
  } else {
    throw new HTTPError('Dados inválidos para cadastro de investimento', 400);
  }
});

server.delete('/investments/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = investments.findIndex((investment) => investment.id === id);

    investments.splice(index, 1);
  }

  res.send(204);
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
