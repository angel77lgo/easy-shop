import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Assuming user.role is populated (e.g., by an AuthGuard)
    // If user.role is an object with a name property (based on Role entity), we access name.
    // If it's just a string or roleId, we might need to adjust.
    // Based on User entity, user.role is a Role entity.

    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.some((role) => user.role.name === role);
  }
}
