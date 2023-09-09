import prisma from '../database/index.js';

async function create(investment) {
  const newInvestment = await prisma.investment.create({
    data: investment,
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return newInvestment;
}

async function readAll(where) {
  if (where?.name) {
    where.name = {
      contains: where.name,
    };
  }

  const investments = await prisma.investment.findMany({
    where,
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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
