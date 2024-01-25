import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles = (roles: string[], userRoles: string) => {
    const userRolesArray = userRoles.split(',');
    for (const userRole of userRolesArray) {
      if (roles.includes(userRole)) {
        return true;
      }
    }
    throw new ForbiddenException('User not allowed');
  };
}
