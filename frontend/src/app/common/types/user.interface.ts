export interface User {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  budget: number;

  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}
