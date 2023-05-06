import { Router } from 'express';
import Investment from './models/Investment.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = Router();

router.get('/investments', (req, res) => {
  const investments = Investment.read();

  res.json(investments);
});

router.post('/investments', (req, res) => {
  const investment = req.body;

  if (investment) {
    const newInvestment = Investment.create(investment);

    res.json(newInvestment);
  } else {
    throw new HTTPError('Invalid data to create invest', 400);
  }
});

router.delete('/investments/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    Investment.remove(id);

    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove investment', 400);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;
