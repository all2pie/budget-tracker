export interface User {
  firstName: string;

  lastName: string;

  email: string;

  budget: number;

  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}
