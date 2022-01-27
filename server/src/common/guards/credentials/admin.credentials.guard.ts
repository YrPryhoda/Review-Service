import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {UserRole} from '@entities/user/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();

        return req.user.userRole === UserRole.Admin;
    }
}
