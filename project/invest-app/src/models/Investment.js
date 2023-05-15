import Database from '../database/database.js';

async function create(investment) {
  const db = await Database.connect();

  const { name, value, category_id } = investment;

  const sql = `
    INSERT INTO
      investments (name, value, category_id)
    VALUES
      (?, ?, ?)
  `;

  const { lastID } = await db.run(sql, [name, value, category_id]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      f.id, f.name, f.value, c.name as category
    FROM
      investments as f INNER JOIN categories as c
    ON
      f.category_id = c.id
  `;

  const investments = await db.all(sql);

  return investments;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      f.id, f.name, f.value, c.name as category
    FROM
      investments as f INNER JOIN categories as c
    ON
      f.category_id = c.id
    WHERE
      f.id = ?
  `;

  const investments = await db.get(sql, [id]);

  return investments;
}

async function update(investment, id) {
  const db = await Database.connect();

  const { name, value, category_id } = investment;

  const sql = `
    UPDATE
      investments
    SET
      name = ?, value = ?, category_id = ?
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [name, value, category_id, id]);

  if (changes === 1) {
    return read(id);
  } else {
    return false;
  }
}

async function remove(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      investments
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
};
