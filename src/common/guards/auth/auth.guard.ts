import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/global/utility';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is public using metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Get the request object from the context and extract the token from the Authorization header
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(); // No token provided
    }

    try {
      // Verify the token using the JWT service and the secret key
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request.userId = payload.sub;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Token expired');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }

    return true;
  }
}
