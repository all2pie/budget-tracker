import { OmitType } from '@nestjs/swagger';
import { User } from 'src/user/user.model';

export class SignUpDto extends OmitType(User, ['role']) {}
