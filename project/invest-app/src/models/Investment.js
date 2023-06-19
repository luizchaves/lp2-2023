import prisma from '../database/index.js';

async function create(investment) {
  const newInvestment = await prisma.investment.create({
    data: investment,
    include: {
      category: true,
    },
  });

  return newInvestment;
}

async function readAll() {
  const investments = await prisma.investment.findMany({
    include: {
      category: true,
    },
  });

  return investments;
}

async function read(id) {
  const investment = await prisma.investment.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return investment;
}

async function update(investment, id) {
  const updatedInvestment = await prisma.investment.update({
    where: {
      id,
    },
    data: investment,
    include: {
      category: true,
    },
  });

  return updatedInvestment;
}

async function remove(id) {
  const removedInvestment = await prisma.investment.delete({
    where: {
      id,
    },
  });

  return removedInvestment;
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
};
