import { resolve } from 'node:path';
import { Database } from 'sqlite-async';

const dbFilePath = resolve('src', 'database', 'db.sqlite');

async function connect() {
  return await Database.open(dbFilePath);
}

export default { connect };
