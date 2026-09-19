import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AuthJwtPayload } from './auth.type.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const requestHeader = request.headers['authorization']?.split(' ')[1];

    if (!requestHeader) {
      throw new ForbiddenException();
    }

    const decoded = jwt.verify(requestHeader, 'my-secret');

    if (typeof decoded === 'string') {
      throw new ForbiddenException();
    }

    const jwtUser = decoded as AuthJwtPayload;

    request.user = jwtUser;

    return true;
  }
}
