import express from 'express';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { investiments } from './data/investiments.js';

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

server.get('/investiments', (req, res) => {
  res.json(investiments);
});

server.post('/investiments', (req, res) => {
  const investiment = req.body;

  const id = uuidv4();

  if (investiment) {
    investiments.push({ ...investiment, id });

    res.json(investiment);
  } else {
    throw new HTTPError('Dados inválidos para cadastro de investimento', 400);
  }
});

server.delete('/investiments/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = investiments.findIndex(
      (investiment) => investiment.id === id
    );

    investiments.splice(index, 1);
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
