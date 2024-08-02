import { Role } from 'src/common/types/user-type.enum';
import { User } from '../user.model';
import * as argon2 from 'argon2';

export const getUsersData = async (): Promise<User[]> => {
  const password = await argon2.hash('Test@1234');

  return [
    {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@emumba.com',
      password,
      budget: 100,
      role: Role.Admin,
    },
  ];
};
