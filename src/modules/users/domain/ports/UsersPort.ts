import { Users, CreateUsersData, UpdateUsersData } from '../entities/Users';

export interface UsersPort {
  createUsers(user: CreateUsersData): Promise<Users>;
  updateUsers(user: UpdateUsersData): Promise<Users>;
  deleteUsers(id: string): Promise<Users>;

  findUsersByUsername(username: string): Promise<Users | null>;
  findUsersById(id: string): Promise<Users | null>;
  findAllUsers(): Promise<Users[]>;
}
