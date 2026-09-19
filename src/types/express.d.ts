import type { AuthJwtPayload } from '../auth/auth.type.ts';

declare global {
  namespace Express {
    interface Request {
      user: AuthJwtPayload;
    }
  }
}
