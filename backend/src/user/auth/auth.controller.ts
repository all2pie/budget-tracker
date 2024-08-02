import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/common/decorators/public-decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signUp')
  signUp(@Body() data: SignUpDto) {
    return this.service.signUp(data);
  }

  @Post('signIn')
  signIn(@Body() data: SignInDto) {
    return this.service.signIn(data);
  }
}
