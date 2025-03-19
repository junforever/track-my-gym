import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export default async function seedUsers() {
  await prisma.users.deleteMany();
  const users = [];
  for (let i = 0; i < 4; i++) {
    users.push({
      username: faker.internet.username(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await argon2.hash('12345'),
      role: ['manager', 'viewer'][Math.floor(Math.random() * 2)],
      status: 'active',
    });
  }
  users.push({
    username: 'superadmin',
    first_name: 'Super',
    last_name: 'Admin',
    email: 'superadmin@gmail.com',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$UMGe/AyH6MqeXACKgix/2w$oiRY9gDcGueuEUgcK8joEMIn546Jy6JPTCdM3tcIiN4',
    role: 'administrator',
    status: 'active',
  });
  await prisma.users.createMany({
    data: users,
  });
}
