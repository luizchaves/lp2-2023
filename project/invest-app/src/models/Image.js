import prisma from '../database/index.js';

async function create({ userId, path }) {
  try {
    const newImage = await prisma.image.create({
      data: {
        path,
        userId,
      },
    });

    return newImage;
  } catch (error) {
    console.error(error);
  }
}

async function update({ userId, path }) {
  const newImage = await prisma.image.update({
    where: {
      userId,
    },
    data: {
      path,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newImage;
}

export default { create, update };
