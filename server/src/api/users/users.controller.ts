import {Get, Put, Req, Param, Delete, HttpCode, UseGuards, Controller, NotFoundException} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';

import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {RolesGuard} from '@common/guards/credentials/admin.credentials.guard';
import {UsersRequestDto, UsersResponseDto} from '@dtos/users';
import {UsersService} from '@entities/user/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) {
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        const profile = await this.userService.getProfile(req.user.id);

        if (!profile) {
            throw new NotFoundException();
        }

        return {
            profile: new UsersResponseDto(profile),
            access_token: profile.token
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async findOne(@Param('userId') id: string): Promise<UsersResponseDto> {
        const user = await this.userService.getUserById(id);
        if (user) {
            return new UsersResponseDto(user);
        }

        throw new NotFoundException();
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(StatusCodes.CREATED)
    async update(@Req() req): Promise<UsersResponseDto> {
        const data: Partial<UsersRequestDto> = req.body;
        console.log(data);
        const id: string = req.user.id;
        const updatedUser = await this.userService.updateUser(id, data);

        if (updatedUser) {
            return new UsersResponseDto(updatedUser);
        }

        throw new NotFoundException();
    }

    @Delete(':userId')
    @HttpCode(StatusCodes.NO_CONTENT)
    async delete(@Param('userId') id: number): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
