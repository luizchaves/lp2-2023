import express from 'express';
import morgan from 'morgan';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const server = express();

server.use(morgan('tiny'));

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/ola', (req, res) => {
  res.send('Olá, mundo!');
});

// Query parameters
// GET /hello/en?name=John
server.get('/hello/en', (req, res) => {
  const name = req.query.name;

  if (name) {
    const result = {
      message: `Hello, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
});

// Route parameters
// GET /hello/pt/John
server.get('/hello/pt/:name', (req, res) => {
  const name = req.params.name;

  if (name) {
    const result = {
      message: `Olá, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
});

// Body parameters
// POST /hello/es
server.post('/hello/es', (req, res) => {
  const name = req.body.name;

  if (name) {
    const result = {
      message: `¡Hola, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
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
