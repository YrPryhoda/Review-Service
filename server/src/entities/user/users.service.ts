import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {v4 as uuid} from 'uuid';

import {hashPassword} from '@common/utils/password.encrypt';
import {EmailStatus, UserInterface} from './interfaces/user.interface';
import {UserRepository} from './user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }

    async getProfile(id: string) {
        return await this.userRepository.findOne({
            where: {id}
        });
    }

    async getUserById(id: number | string): Promise<UserInterface> {
        return await this.userRepository.findOne({
            where: {id}
        });
    }

    async createUser(user: Partial<UserInterface>): Promise<UserInterface> {
        const passwordHash = await hashPassword(user.password);

        return await this.userRepository.save({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: passwordHash,
            emailStatus: EmailStatus.Pending,
            signupConfirmId: uuid()
        });
    }

    async updateUser(id: string, data: Partial<UserInterface>): Promise<UserInterface> {
        const user = await this.getUserById(id);
        const {password, ...restData} = data;

        if (!user) {
            throw new NotFoundException();
        }
        const updatedUser: typeof data = {...user, ...restData};

        if (password) {
            updatedUser.password = await hashPassword(password);
        }

        return await this.userRepository.save(updatedUser);
    }

    async getUserByEmail(email: string): Promise<UserInterface> {
        return await this.userRepository.findByEmail(email);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
