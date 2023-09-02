import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Investment from './models/Investment.js';
import Category from './models/Category.js';
import User from './models/User.js';

import { isAuthenticated } from './middleware/auth.js';

const saltRounds = Number(process.env.SALT_ROUNDS);

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

router.post('/investments', isAuthenticated, async (req, res) => {
  const investment = req.body;

  const newInvestment = await Investment.create(investment);

  if (newInvestment) {
    res.json(newInvestment);
  } else {
    throw new HTTPError('Invalid data to create investment', 400);
  }
});

router.get('/investments', isAuthenticated, async (req, res) => {
  const investments = await Investment.readAll();

  res.json(investments);
});

router.put('/investments/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const investment = req.body;

  if (id && investment) {
    const newInvestment = await Investment.update(investment, id);

    res.json(newInvestment);
  } else {
    throw new HTTPError('Invalid data to update investment', 400);
  }
});

router.delete('/investments/:id', isAuthenticated, async (req, res) => {
  const id = req.params.id;

  if (id && (await Investment.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove investment', 400);
  }
});

router.get('/categories', isAuthenticated, async (req, res) => {
  const categories = await Category.readAll();

  res.json(categories);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const hash = await bcrypt.hash(user.password, saltRounds);

  user.password = hash;

  const newUser = await User.create(user);

  res.status(201).json(newUser);
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.readByEmail(email);

    const { id: userId, password: hash } = user;

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;
