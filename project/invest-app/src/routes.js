import { Router } from 'express';
import Investment from './models/Investment.js';
import Category from './models/Category.js';
import User from './models/User.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/home.html');
});

router.post('/investments', async (req, res) => {
  const investment = req.body;

  const newInvestment = await Investment.create(investment);

  if (newInvestment) {
    res.json(newInvestment);
  } else {
    throw new HTTPError('Invalid data to create investment', 400);
  }
});

router.get('/investments', async (req, res) => {
  const investments = await Investment.readAll();

  res.json(investments);
});

router.put('/investments/:id', async (req, res) => {
  const id = Number(req.params.id);

  const investment = req.body;

  if (id && investment) {
    const newInvestment = await Investment.update(investment, id);

    res.json(newInvestment);
  } else {
    throw new HTTPError('Invalid data to update investment', 400);
  }
});

router.delete('/investments/:id', async (req, res) => {
  const id = req.params.id;

  if (id && (await Investment.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove investment', 400);
  }
});

router.get('/categories', async (req, res) => {
  const categories = await Category.readAll();

  res.json(categories);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const newUser = await User.create(user);

  res.status(201).json(newUser);
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
