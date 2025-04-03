import { users as PrismaUser } from '@prisma/client';
import { UsersSchema } from '@/modules/users/domain/entities/Users';
import argon2 from 'argon2';
import { faker } from '@faker-js/faker';

describe('Testing Users interfaces', () => {
  test('should match prisma user interface', async () => {
    const prismaUser: PrismaUser = {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: await argon2.hash('test'),
      role: faker.helpers.arrayElement(['admin', 'user', 'viewer']),
      status: faker.helpers.arrayElement(['active', 'inactive']),
      createdAt: faker.helpers.arrayElement([null, faker.date.future()]),
      updatedAt: faker.helpers.arrayElement([null, faker.date.future()]),
    };

    const result = UsersSchema.safeParse(prismaUser);
    expect(result.success).toBeTruthy();
    if (result.success) {
      expect(prismaUser).toEqual(result.data);
    }
  });
});
