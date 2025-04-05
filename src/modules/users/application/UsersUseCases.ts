import { UsersPort } from '../domain/ports/UsersPort';
import { Users } from '../domain/entities/Users';

export class UsersUseCases {
  constructor(private usersPort: UsersPort) {}

  async createUsers(user: Users): Promise<Users> {
    return await this.usersPort.createUsers(user);
  }

  async updateUsers(user: Users): Promise<Users> {
    return await this.usersPort.updateUsers(user);
  }

  async deleteUsers(id: string): Promise<Users> {
    return await this.usersPort.deleteUsers(id);
  }

  async findUsersByUsername(username: string): Promise<Users | null> {
    return await this.usersPort.findUsersByUsername(username);
  }

  async findUsersById(id: string): Promise<Users | null> {
    return await this.usersPort.findUsersById(id);
  }

  async findAllUsers(): Promise<Users[]> {
    return await this.usersPort.findAllUsers();
  }
}
