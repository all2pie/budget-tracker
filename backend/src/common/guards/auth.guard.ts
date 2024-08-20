import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public-decorator';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { Logger } from '../utils/logger/logger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private cls: ClsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const headerToken = this.extractTokenFromHeader(request);
    const cookieToken = this.extractTokenFromCookie(request);

    const token = cookieToken || headerToken;

    if (!token) {
      throw new UnauthorizedException('Missing JWT');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      // Assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      this.cls.set('user', payload);
      this.cls.set('userId', payload.id);

      Logger.http(payload.id, 'UserId');
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const tokens = request.cookies.tokens;
    return tokens ? tokens.accessToken : undefined;
  }
}
