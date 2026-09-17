import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestHeader = context
      .switchToHttp()
      .getRequest<Request>()
      .headers['authorization']?.split(' ')[1];

    if (!requestHeader) {
      throw new ForbiddenException();
    }

    const jwtUser = jwt.verify(requestHeader, 'test');

    console.log(jwtUser);

    return true;
  }
}
