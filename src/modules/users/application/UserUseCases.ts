import { UsersPort } from '../domain/ports/UsersPort';
import { Users } from '../domain/entities/Users';

export class UsersUseCases {
  constructor(private usersPort: UsersPort) {}

  async createUser(user: Users): Promise<Users> {
    return await this.usersPort.createUser(user);
  }

  async updateUser(user: Users): Promise<Users> {
    return await this.usersPort.updateUser(user);
  }

  async deleteUser(id: string): Promise<Users> {
    return await this.usersPort.deleteUser(id);
  }

  async findUserByUsername(username: string): Promise<Users | null> {
    return await this.usersPort.findUserByUsername(username);
  }

  async findUserById(id: string): Promise<Users | null> {
    return await this.usersPort.findUserById(id);
  }

  async findAllUsers(): Promise<Users[]> {
    return await this.usersPort.findAllUsers();
  }
}
