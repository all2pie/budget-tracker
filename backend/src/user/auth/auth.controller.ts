import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/common/decorators/public-decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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
  async signIn(
    @Body() data: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.service.signIn(data);

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    res.cookie('tokens', tokens, {
      httpOnly: true,
      expires: expiry,
    });

    return tokens;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('tokens', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return {
      success: true,
    };
  }
}
