import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/user.model';

export class SignInDto extends PickType(User, ['email', 'password']) {}
