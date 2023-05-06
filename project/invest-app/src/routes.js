import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { investments, categories } from './data/investments.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

function loadCategoryValues(investments) {
  for (const investment of investments) {
    const categoryId = investment.category_id;

    const category = categories.find((category) => category.id === categoryId);

    investment.category = category.name;
    investment.categoryBackground = category.background;
  }
}

router.get('/investments', (req, res) => {
  loadCategoryValues(investments);

  res.json(investments);
});

router.post('/investments', (req, res) => {
  const investment = req.body;

  const id = uuidv4();

  if (investment) {
    investments.push({ ...investment, id });

    loadCategoryValues(investments);

    res.json(investments.find((investment) => investment.id === id));
  } else {
    throw new HTTPError('Dados inválidos para cadastro de investimento', 400);
  }
});

router.delete('/investments/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = investments.findIndex((investment) => investment.id === id);

    investments.splice(index, 1);
  }

  res.send(204);
});

router.get('/categories', (req, res) => {
  res.json(categories);
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
