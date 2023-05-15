import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Investment from '../models/Investment.js';
import Category from '../models/Category.js';

async function up() {
  const file = resolve('src', 'database', 'seeders.json');

  const content = JSON.parse(readFileSync(file));

  for (const category of content.categories) {
    await Category.create(category);
  }

  for (const investment of content.investments) {
    await Investment.create(investment);
  }
}

export default { up };
