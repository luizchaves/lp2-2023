import express from 'express';
import morgan from 'morgan';

const server = express();

server.use(morgan('tiny'));

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/ola', (req, res) => {
  res.send('Olá, mundo!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
