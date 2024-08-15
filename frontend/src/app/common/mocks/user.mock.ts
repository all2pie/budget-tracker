import { Role } from '../types/user.interface';

export const userMock = {
  firstName: 'Mr',
  lastName: 'Tester',
  budget: 19000,
  email: 'tester@gmail.com',
  role: Role.User,
};

export const adminMock = {
  firstName: 'Super',
  lastName: 'Admin',
  budget: 20000,
  email: 'admin@gmail.com',
  role: Role.Admin,
};
