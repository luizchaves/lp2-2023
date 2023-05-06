import { v4 as uuidv4 } from 'uuid';
import { investments } from '../data/investments.js';

function read() {
  return investments;
}

function create(investment) {
  const id = uuidv4();

  if (investment) {
    investments.push({ ...investment, id });

    return investment;
  } else {
    throw new Error('Error to create investment');
  }
}

function remove(id) {
  if (id) {
    const index = investments.findIndex((investment) => investment.id === id);

    investments.splice(index, 1);
  } else {
    throw new Error('Error to remove investment');
  }
}

export default {
  create,
  read,
  remove,
};
