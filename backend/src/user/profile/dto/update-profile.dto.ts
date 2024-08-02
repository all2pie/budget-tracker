import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from 'src/user/user.model';

export class UpdateProfileDto extends PartialType(
  OmitType(User, ['role', 'password', 'email']),
) {}
