import prisma from '../database/index.js';

async function readAll() {
  const users = await prisma.host.findMany({
    include: {
      image: {
        select: {
          path: true,
        },
      },
    },
  });

  return users;
}

async function read(id) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      image: {
        select: {
          path: true,
        },
      },
    },
  });

  return user;
}

async function readByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

async function create(user) {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
}

async function update(user, id) {
  const newUser = await prisma.user.update({
    data: user,
    where: {
      id,
    },
  });

  return newUser;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  readAll,
  read,
  readByEmail,
  create,
  remove,
  update,
};
