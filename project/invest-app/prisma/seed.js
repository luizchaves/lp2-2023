import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pos = await prisma.category.create({
    data: {
      id: 1,
      name: 'Pós',
    },
  });

  const pre = await prisma.category.create({
    data: {
      id: 2,
      name: 'Pré',
    },
  });

  const ipca = await prisma.category.create({
    data: {
      id: 3,
      name: 'IPCA',
    },
  });

  const rendaVariavel = await prisma.category.create({
    data: {
      id: 4,
      name: 'Renda Variável',
    },
  });

  const alternativos = await prisma.category.create({
    data: {
      id: 5,
      name: 'Alternativos',
    },
  });

  const selic2029 = await prisma.investment.create({
    data: {
      name: 'Tesouro Selic 2029',
      value: 100,
      categoryId: 1,
    },
  });

  const ipca2029 = await prisma.investment.create({
    data: {
      name: 'Tesouro IPCA 2029',
      value: 100,
      categoryId: 3,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
