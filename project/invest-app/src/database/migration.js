import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const categoriesSql = `
    CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL
    )
  `;

  await db.run(categoriesSql);

  const investmentsSql = `
    CREATE TABLE investments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL,
      value DOUBLE NOT NULL,
      category_id INTEGER NOT NULL REFERENCES categories (id)
    )
  `;

  await db.run(investmentsSql);
}

export default { up };
