import { Users, CreateUserData, UpdateUserData } from '../entities/Users';

export interface UsersPort {
  createUser(user: CreateUserData): Promise<Users>;
  updateUser(user: UpdateUserData): Promise<Users>;
  deleteUser(id: string): Promise<Users>;

  findUserByUsername(username: string): Promise<Users | null>;
  findUserById(id: string): Promise<Users | null>;
  findAllUsers(): Promise<Users[]>;
}
