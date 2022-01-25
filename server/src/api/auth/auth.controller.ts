import {
    BadRequestException,
    ConflictException,
    NotFoundException,
    Controller,
    UseGuards,
    HttpCode,
    Param,
    Body,
    Post,
    Get,
    Req
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {StatusCodes} from 'http-status-codes';

import {EmailStatus} from '@entities/user/interfaces/user.interface';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {UsersRequestDto, UsersResponseDto} from '@dtos/users';
import {AuthService} from '@entities/user/auth/auth.service';
import {UsersService} from '@entities/user/users.service';
import {MailService} from '@common/services/mail.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
        private mailerService: MailService
    ) {
    }

    @Post('confirm')
    @HttpCode(StatusCodes.OK)
    async confirm(@Body() data: { userId: string, link: string }) {
        const {userId, link} = data;
        const user = await this.authService.confirmSignup(userId, link);
        return new UsersResponseDto(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @HttpCode(StatusCodes.CREATED)
    async register(@Body() data: UsersRequestDto): Promise<UsersResponseDto> {
        try {
            const user = await this.userService.createUser(data);
            await this.mailerService.signUpConfirm(user);
            return new UsersResponseDto(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User with this email already exists');
            } else {
                throw new BadRequestException();
            }
        }
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req) {
        const {id} = req.user;
        const user = await this.authService.logout(id);
        return new UsersResponseDto(user);
    }

    @Get('register/finish/:userId')
    async registerFinish(@Param('userId') userId: string) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new NotFoundException();
        }

        if (user.emailStatus === EmailStatus.Pending) {
            return new UsersResponseDto(user);
        }

        throw new BadRequestException();
    }
}
