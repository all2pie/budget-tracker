import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/user-type.enum';

export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
