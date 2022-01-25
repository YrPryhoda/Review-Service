import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from '@entities/user/users.service';
import {JwtService} from '@nestjs/jwt';

import {EmailStatus, UserInterface} from '@entities/user/interfaces/user.interface';
import {comparePassword} from '@common/utils/password.encrypt';
import {UsersResponseDto} from '@dtos/users';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<Omit<UserInterface, 'password'> | null | never> {
        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException();
        }

        if (user.emailStatus === EmailStatus.Pending) {
            throw new BadRequestException('User has not confirmed email yet');
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (isPasswordCorrect) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async confirmSignup(userId: string, link: string) {
        const user = await this.usersService.getUserById(userId);
        if (user?.signupConfirmId !== link) {
            throw new BadRequestException('Invalid token');
        }

        await this.usersService.updateUser(userId, {
            emailStatus: EmailStatus.Cinfirm,
            signupConfirmId: null
        });
        return await this.usersService.getUserById(userId);
    }

    async login(user: UserInterface) {
        const payload = {email: user.email, sub: user.id};
        const token = this.jwtService.sign(payload);
        const profile = await this.usersService.updateUser(user.id, {token});

        return {
            access_token: token,
            profile: new UsersResponseDto(profile)
        };
    }

    async logout(id: string) {
        return await this.usersService.updateUser(id, {token: null});
    }
}
