import { PrismaClient } from '@prisma/client';
import seedProd from './seeders/seedProd';
import seedUsers from './seeders/seedUsers';

const prisma = new PrismaClient();
const environment = process.env.NODE_ENV || 'development';

async function main() {
  if (environment === 'production') {
    await seedProd();
    return;
  }

  if (environment === 'development') {
    await seedUsers();
    return;
  }
}

main()
  .catch((e) => {
    console.error(`Error seeding database: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
