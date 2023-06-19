import prisma from '../database/index.js';

async function create(category) {
  const newCategory = await prisma.category.create({
    data: category,
  });

  return newCategory;
}

async function readAll() {
  const categories = await prisma.category.findMany();

  return categories;
}

async function read(id) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

export default { create, readAll, read };
