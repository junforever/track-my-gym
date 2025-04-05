import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function seedProd() {
  await prisma.users.create({
    data: {
      username: 'superadmin',
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@gmail.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$UMGe/AyH6MqeXACKgix/2w$oiRY9gDcGueuEUgcK8joEMIn546Jy6JPTCdM3tcIiN4',
      role: 'admin',
      status: 'active',
    },
  });
}
